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
	const isAdmin = req.user?.role === "admin";
	const requesterId = req.user?.id;

	// Only admins can update any user, customers can only update their own profile
	if (!isAdmin && requesterId !== userId) {
		return res.status(403).json({
			success: false,
			message: "Forbidden: You do not have permission to update this user.",
		});
	}

	try {
		const result = await userService.updateUser(
			userId as string,
			req.body,
			isAdmin,
		);
		if (result === null) {
			return res.status(404).json({
				success: false,
				message: "User not found.",
			});
		}
		res.status(200).json({
			success: true,
			message: "User updated successfully.",
			data: result.rows[0],
		});
	} catch (error: any) {
		res.status(500).json({
			success: false,
			message: "An error occurred while updating the user.",
		});
	}
};

export const userController = {
	getAllUsers,
	updateUser,
};
