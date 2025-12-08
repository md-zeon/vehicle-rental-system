import { Router } from "express";
import { vehicleController } from "./vehicle.controller";
import authorize from "../../middleware/auth";

const router = Router();

// Add a new vehicle to the system (Admin only)
router.post("/", authorize("admin"), vehicleController.createVehicle);

// Retrieve all vehicles in the system
router.get("/", vehicleController.getAllVehicles);

// Retrieve specific vehicle details
router.get("/:vehicleId", vehicleController.getVehicleById);

// Update vehicle details, price, or availability status (Admin only)
router.put("/:vehicleId", authorize("admin"), vehicleController.updateVehicle);

// Delete a vehicle (only if no active bookings exist)
router.delete("/:vehicleId", authorize("admin"), vehicleController.deleteVehicle);

export const vehicleRoutes = router;
