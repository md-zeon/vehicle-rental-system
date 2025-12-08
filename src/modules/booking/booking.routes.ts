import { Router } from "express";
import { bookingController } from "./booking.controller";
import authorize from "../../middleware/auth";
import updateExpiredBookings from "../../middleware/updateExpiredBookings";

const router = Router();

// Create a new booking with automatic price calculation and vehicle status update
router.post(
	"/",
	authorize("admin", "customer"),
	bookingController.createBooking,
);

// Retrieve bookings based on user role (Admin sees all, Customer sees own)
router.get(
	"/",
	authorize("admin", "customer"),
	bookingController.getAllBookings,
);

// Update booking status based on user role and business rules and system actions
router.put(
	"/:bookingId",
	updateExpiredBookings,
	authorize("admin", "customer"),
	bookingController.updateBookingStatus,
);

export const bookingRoutes = router;
