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

const updateBookingStatus = async (req: Request, res: Response) => {
	const { bookingId } = req.params;
	const { status } = req.body;
	const isAdmin = req.user?.role === "admin";
	const requesterId = req.user?.id;

	try {
		// Fetch the booking to ensure it exists
		const bookingResult = await bookingService.getBookingById(
			bookingId as string,
		);
		const booking = bookingResult.rows[0];
		if (!booking) {
			return res.status(404).json({
				success: false,
				message: "Booking not found",
			});
		}

		// Business rules for status updates
		if (!isAdmin) {
			// Customers can only cancel their own bookings
			if (booking.customer_id !== requesterId) {
				return res.status(403).json({
					success: false,
					message:
						"Forbidden: You do not have permission to update this booking",
				});
			}
			if (status !== "cancelled") {
				return res.status(400).json({
					success: false,
					message: "Invalid status update: Customers can only cancel bookings",
				});
			}
			if (status === "cancelled") {
				const currentDate = new Date();
				const rentStartDate = new Date(booking.rent_start_date);
				if (currentDate >= rentStartDate) {
					return res.status(400).json({
						success: false,
						message: "Cannot cancel booking: Rental period has already started",
					});
				}
			}
		} else {
			if (status !== "returned") {
				return res.status(400).json({
					success: false,
					message:
						"Invalid status update: Admins can only mark bookings as returned",
				});
			}
		}

		// Update the booking status
		const updatedBooking = await bookingService.updateBookingStatus(
			bookingId as string,
			status,
		);

		// If booking is returned or cancelled, update vehicle status to 'available'
		if (status === "returned" || status === "cancelled") {
			const updatedVehicle = await vehicleService.updateVehicleStatus(
				updatedBooking.rows[0].vehicle_id,
				"available",
			);
			if (status === "returned") {
				updatedBooking.rows[0].vehicle = {
					availability_status: updatedVehicle.rows[0].availability_status,
				};
			}
		}

		res.status(200).json({
			success: true,
			message:
				status === "cancelled"
					? "Booking cancelled successfully"
					: "Booking marked as returned. Vehicle is now available",
			data: updatedBooking.rows[0],
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
	updateBookingStatus,
};
