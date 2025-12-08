import { Router } from "express";
import { authController } from "./auth.controller";

const router = Router();
// / => http://localhost:5000/api/v1/auth/

// Register a new user account
router.post("/signup", authController.registerUser);

export const authRoutes = router;
