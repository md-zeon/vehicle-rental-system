import { Request, Response } from "express";
import { bookingService } from "./booking.service";
import { userService } from "../user/user.service";
import { vehicleService } from "../vehicle/vehicle.service";

const createBooking = async (req: Request, res: Response) => {
	try {
		const result = await bookingService.createBooking(req.body);
		const booking = result.rows[0];
		const vehicle = await vehicleService.getVehicleById(booking.vehicle_id);
		const data = {
			...booking,
			vehicle: {
				vehicle_name: vehicle.rows[0].vehicle_name,
				daily_rent_price: vehicle.rows[0].daily_rent_price,
			},
		};

		res.status(201).json({
			success: true,
			message: "Booking created successfully",
			data,
		});
	} catch (error: any) {
		res.status(500).json({
			success: false,
			message: error.message,
			errors: error,
		});
	}
};

const getAllBookings = async (req: Request, res: Response) => {
	const isAdmin = req.user?.role === "admin";
	try {
		const result = await bookingService.getAllBookings();
		const bookings = result.rows;

		const data = bookings.map(async (booking) => {
			const customer = await userService.getUserById(booking.customer_id);
			const vehicle = await vehicleService.getVehicleById(booking.vehicle_id);

			if (isAdmin) {
				return {
					...booking,
					customer: {
						name: customer.rows[0].name,
						email: customer.rows[0].email,
					},
					vehicle: {
						vehicle_name: vehicle.rows[0].vehicle_name,
						registration_number: vehicle.rows[0].registration_number,
					},
				};
			} else {
				return {
					...booking,
					vehicle: {
						vehicle_name: vehicle.rows[0].vehicle_name,
						registration_number: vehicle.rows[0].registration_number,
						type: vehicle.rows[0].type,
					},
				};
			}
		});

		res.status(200).json({
			success: true,
			message: isAdmin
				? "Bookings retrieved successfully"
				: "Your bookings retrieved successfully",
			data: await Promise.all(data),
		});
	} catch (error: any) {
		res.status(500).json({
			success: false,
			message: error.message,
			errors: error,
		});
	}
};

export const bookingController = {
	createBooking,
	getAllBookings,
};
