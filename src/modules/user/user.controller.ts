import { Request, Response } from "express";
import { userService } from "./user.service";

const getAllUsers = async (req: Request, res: Response) => {
	const result = await userService.getAllUsers();

	res.status(200).json({
		success: true,
		message: "Users retrieved successfully.",
		data: result.rows,
	});
};

export const userController = {
	getAllUsers,
};
