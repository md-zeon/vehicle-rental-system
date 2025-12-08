import { Router } from "express";
import { vehicleController } from "./vehicle.controller";
import authorize from "../../middleware/auth";

const router = Router();

// Add a new vehicle to the system (Admin only)
router.post("/", authorize("admin"), vehicleController.createVehicle);

// Retrieve all vehicles in the system
router.get("/", vehicleController.getAllVehicles);

export const vehicleRoutes = router;
