import { Router } from "express";
import { vehicleController } from "./vehicle.controller";
import authorize from "../../middleware/auth";

const router = Router();

// Add a new vehicle to the system (Admin only)
router.post("/", authorize("admin"), vehicleController.createVehicle);

export const vehicleRoutes = router;
