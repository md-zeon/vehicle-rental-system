import { pool } from "../../config/db";
import bcrypt from "bcryptjs";
import { userService } from "../user/user.service";
import jwt from "jsonwebtoken";
import CONFIG from "../../config";

const registerUser = async (payload: Record<string, unknown>) => {
	const { name, email, password, phone, role } = payload;
	const hashedPassword = await bcrypt.hash(password as string, 10);

	const result = await pool.query(
		`
        INSERT INTO users (name, email, password, phone, role)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *
        `,
		[name, email, hashedPassword, phone, role],
	);
	return result;
};

const loginUser = async (payload: Record<string, unknown>) => {
	const { email, password } = payload;
	const result = await userService.getUserByEmail(email as string);
	if (result.rows.length === 0) {
		return null;
	}

	const user = result.rows[0];
	const isPasswordMatch = await bcrypt.compare(
		password as string,
		user.password,
	);

	if (!isPasswordMatch) {
		return false;
	}

	// JWT => Header.Payload.Signature
	const token = jwt.sign(
		{
			name: user.name,
			email: user.email,
			role: user.role,
		},
		CONFIG.JWT_SECRET as string,
		{
			expiresIn: "1h",
		},
	);

	return { token, user };
};

export const authService = {
	registerUser,
	loginUser,
};
