import { Router } from "express";
import { bookingController } from "./booking.controller";
import authorize from "../../middleware/auth";

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

// Update booking status based on user role and business rules
router.put(
	"/:bookingId",
	authorize("admin", "customer"),
	bookingController.updateBookingStatus,
);

export const bookingRoutes = router;
