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

export const userService = {
	getUserByEmail,
};
