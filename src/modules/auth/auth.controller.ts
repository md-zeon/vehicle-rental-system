import { Request, Response } from "express";
import { authService } from "./auth.service";

const registerUser = async (req: Request, res: Response) => {
	try {
		const result = await authService.registerUser(req.body);

		if (result.rows.length === 0) {
			return res.status(400).json({
				success: false,
				message: "User registration failed",
			});
		}

		res.status(201).json({
			success: true,
			message: "User registered successfully",
			data: result.rows[0],
		});
	} catch (error: any) {
		res.status(500).json({
			success: false,
			message: error.message || "Internal Server Error",
			errors: error,
		});
	}
};

export const authController = {
	registerUser,
};
