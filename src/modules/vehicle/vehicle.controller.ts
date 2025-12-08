import { Request, Response } from "express";
import { vehicleService } from "./vehicle.service";

const createVehicle = async (req: Request, res: Response) => {
	try {
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
	} catch (error: any) {
		res.status(500).json({
			success: false,
			message: "An error occurred while creating the vehicle.",
		});
	}
};

const getAllVehicles = async (req: Request, res: Response) => {
	try {
		const result = await vehicleService.getAllVehicles();
		res.status(200).json({
			success: true,
			message:
				result.rows.length === 0
					? "No vehicles found."
					: "Vehicles retrieved successfully.",
			data: result.rows,
		});
	} catch (error: any) {
		res.status(500).json({
			success: false,
			message: "An error occurred while retrieving vehicles.",
		});
	}
};

const getVehicleById = async (req: Request, res: Response) => {
	const { vehicleId } = req.params;
	try {
		const result = await vehicleService.getVehicleById(vehicleId as string);

		res.status(200).json({
			success: true,
			message:
				result.rows.length === 0
					? "Vehicle not found."
					: "Vehicle retrieved successfully.",
			data: result.rows.length === 0 ? [] : result.rows[0],
		});
	} catch (error: any) {
		res.status(500).json({
			success: false,
			message: "An error occurred while retrieving the vehicle.",
		});
	}
};

const updateVehicle = async (req: Request, res: Response) => {
	const { vehicleId } = req.params;
	try {
		const result = await vehicleService.updateVehicle(
			vehicleId as string,
			req.body,
		);

		if (result.rows.length === 0) {
			return res.status(404).json({
				success: false,
				message: "Vehicle not found. Update failed.",
			});
		}

		res.status(200).json({
			success: true,
			message: "Vehicle updated successfully.",
			data: result.rows[0],
		});
	} catch (error: any) {
		res.status(500).json({
			success: false,
			message: "An error occurred while updating the vehicle.",
		});
	}
};

const deleteVehicle = async (req: Request, res: Response) => {
	try {
		// logic will be added later
	} catch (error: any) {
		res.status(500).json({
			success: false,
			message: "An error occurred while deleting the vehicle.",
		});
	}
};

export const vehicleController = {
	createVehicle,
	getAllVehicles,
	getVehicleById,
	updateVehicle,
	deleteVehicle,
};
