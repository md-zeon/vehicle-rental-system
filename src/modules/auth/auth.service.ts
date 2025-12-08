import { pool } from "../../config/db";

const registerUser = async (payload: Record<string, unknown>) => {
	console.log(payload);
	const { name, email, password, phone, role } = payload;

	const result = await pool.query(
		`
        INSERT INTO users (name, email, password, phone, role)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *
        `,
		[name, email, password, phone, role],
	);
	console.log(result);
	return result;
};

export const authService = {
	registerUser,
};
