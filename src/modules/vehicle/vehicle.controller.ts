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

export const vehicleController = {
	createVehicle,
};
