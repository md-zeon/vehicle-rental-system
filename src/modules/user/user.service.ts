import { pool } from "../../config/db";

const getUserByEmail = async (email: string) => {
	const result = await pool.query(
		`
            SELECT * FROM users WHERE email = $1
        `,
		[email],
	);
	return result;
};

const getUserById = async (id: string) => {
	const result = await pool.query(
		`
			SELECT id, name, email, phone, role FROM users WHERE id = $1
		`,
		[id],
	);
	return result;
};

const getAllUsers = async () => {
	const result = await pool.query(
		`
            SELECT id, name, email, phone, role FROM users
        `,
	);
	return result;
};

const updateUser = async (
	userId: string,
	payload: Record<string, unknown>,
	isAdmin: boolean,
) => {
	// if not admin, restrict role update
	if (!isAdmin) {
		if ("role" in payload) {
			delete payload.role;
		}
	}

	const user = await getUserById(userId);
	if (user.rows.length === 0) {
		// User not found
		return null;
	}

	const updatedUser = { ...user.rows[0], ...payload };

	const { name, email, phone, role } = updatedUser;

	const result = await pool.query(
		`
		UPDATE users
		SET name = $1,
			email = $2,
			phone = $3,
			role = $4
		WHERE id = $5
		RETURNING id, name, email, phone, role
	`,
		[name, email, phone, role, userId],
	);

	return result;
};

export const userService = {
	getUserById,
	getUserByEmail,
	getAllUsers,
	updateUser,
};
