import { Router } from "express";
import authorize from "../../middleware/auth";
import { userController } from "./user.controller";

const router = Router();

// Retrieve all users in the system
router.get("/", authorize("admin"), userController.getAllUsers);

// Update user information
// Admin can update any user's role or details. Customer can update own profile only
router.put(
	"/:userId",
	authorize("admin", "customer"),
	userController.updateUser,
);

// Delete a user (only if no active bookings exist)
router.delete("/:userId", authorize("admin"), userController.deleteUser);

export const userRoutes = router;
