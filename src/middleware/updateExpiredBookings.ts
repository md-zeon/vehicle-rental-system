import { pool } from "../config/db";
import { Request, Response, NextFunction } from "express";

const updateExpiredBookings = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		await pool.query(`
      WITH updated_bookings AS (
        UPDATE bookings
        SET status = 'returned'
        WHERE rent_end_date < CURRENT_DATE 
        AND status = 'active'
        RETURNING vehicle_id
      )
      UPDATE vehicles
      SET availability_status = 'available'
      WHERE id IN (SELECT vehicle_id FROM updated_bookings)
    `);
		console.log("Expired bookings updated successfully");
		next();
	} catch (error) {
		console.error("Auto-update failed:", error);
		next();
	}
};

export default updateExpiredBookings;
