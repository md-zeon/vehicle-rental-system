import { Request, Response } from "express";
import { vehicleService } from "./vehicle.service";

const createVehicle = async (req: Request, res: Response) => {
	const result = await vehicleService.createVehicle(req.body);

	if (result.rows.length === 0) {
		return res.status(400).json({
			success: false,
			message: "Failed to create vehicle.",
		});
	}

	res.status(201).json({
		success: true,
		message: "Vehicle created successfully.",
		data: result.rows[0],
	});
};

const getAllVehicles = async (req: Request, res: Response) => {
	const result = await vehicleService.getAllVehicles();
	res.status(200).json({
		success: true,
		message:
			result.rows.length === 0
				? "No vehicles found."
				: "Vehicles retrieved successfully.",
		data: result.rows,
	});
};

export const vehicleController = {
	createVehicle,
	getAllVehicles,
};
