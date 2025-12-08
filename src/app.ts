import express from "express";
import initializeDB from "./config/db";
const app = express();

// Middleware to parse JSON requests
app.use(express.json());

// Initialize the database
initializeDB();

app.get("/", (req, res) => {
	res.send("Vehicle Management API is running.");
});

// Routes

app.use("")

export default app;
