import { pool } from "../../config/db";
import { userService } from "../user/user.service";
import { vehicleService } from "../vehicle/vehicle.service";

const createBooking = async (payload: Record<string, unknown>) => {
	const { customer_id, vehicle_id, rent_start_date, rent_end_date } = payload;

	// Fetch vehicle details to get the daily rate
	const vehicle = (await vehicleService.getVehicleById(vehicle_id as string))
		.rows[0];
	if (!vehicle) {
		throw new Error("Vehicle not found");
	}

	if (vehicle.availability_status === "booked") {
		throw new Error("Vehicle is not available for booking");
	}

	// Calculate rental days
	const startDate = new Date(rent_start_date as string);
	const endDate = new Date(rent_end_date as string);
	const timeDiff = endDate.getTime() - startDate.getTime();
	const rentalDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

	// Calculate total price
	const dailyRate = vehicle.daily_rent_price;
	const totalPrice = dailyRate * rentalDays;

	// Insert booking record
	const result = await pool.query(
		`INSERT INTO bookings (customer_id, vehicle_id, rent_start_date, rent_end_date, total_price, status)
         VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
		[
			customer_id,
			vehicle_id,
			rent_start_date,
			rent_end_date,
			totalPrice,
			"active",
		],
	);

	// Update vehicle status to 'booked'
	await vehicleService.updateVehicleStatus(vehicle_id as string, "booked");

	return result;
};

const getBookingById = async (bookingId: string) => {
	const result = await pool.query(
		`
        SELECT * FROM bookings WHERE id = $1
    `,
		[bookingId],
	);

	return result;
};

const getAllBookings = async () => {
	const result = await pool.query(`SELECT * FROM bookings;`);
	return result;
};

const updateBookingStatus = async (bookingId: string, status: string) => {
	const result = await pool.query(
		`
			UPDATE bookings
			SET status = $1
			WHERE id = $2
			RETURNING *;
		`,
		[status, bookingId],
	);
	return result;
};

export const bookingService = {
	createBooking,
	getBookingById,
	getAllBookings,
	updateBookingStatus,
};
