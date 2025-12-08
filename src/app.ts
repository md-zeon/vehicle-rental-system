import express from "express";
import initializeDB from "./config/db";
import { authRoutes } from "./modules/auth/auth.routes";
const app = express();

// Middleware to parse JSON requests
app.use(express.json());

// Initialize the database
initializeDB();

app.get("/", (req, res) => {
	res.send("Vehicle Management API is running.");
});

// Authentication Routes
app.use("/api/v1/auth", authRoutes);

export default app;
