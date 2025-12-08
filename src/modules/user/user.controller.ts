import { Request, Response } from "express";
import { userService } from "./user.service";

const getAllUsers = async (req: Request, res: Response) => {
	try {
		const result = await userService.getAllUsers();

		res.status(200).json({
			success: true,
			message: "Users retrieved successfully.",
			data: result.rows,
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: "An error occurred while retrieving users.",
		});
	}
};

const updateUser = async (req: Request, res: Response) => {
	const userId = req.params.id;
};

export const userController = {
	getAllUsers,
	updateUser,
};
