import { Router } from "express";
import authorize from "../../middleware/auth";
import { userController } from "./user.controller";

const router = Router();

// Retrieve all users in the system
router.get("/", authorize("admin"), userController.getAllUsers);

export const userRoutes = router;
