import { pool } from "../../config/db";

const createVehicle = async (payload: Record<string, unknown>) => {
	const {
		vehicle_name,
		type,
		registration_number,
		daily_rent_price,
		availability_status,
	} = payload;

	const result = await pool.query(
		`
            INSERT INTO vehicles (vehicle_name, type, registration_number, daily_rent_price, availability_status)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *  
        `,
		[
			vehicle_name,
			type,
			registration_number,
			daily_rent_price,
			availability_status,
		],
	);

	return result;
};

const getAllVehicles = async () => {
	const result = await pool.query(
		`
            SELECT * FROM vehicles
        `,
	);
	return result;
};

const getVehicleById = async (vehicleId: string) => {
	const result = await pool.query(
		`
            SELECT * FROM vehicles WHERE id = $1
        `,
		[vehicleId],
	);
	return result;
};

const updateVehicle = async (
	vehicleId: string,
	payload: Record<string, unknown>,
) => {
	const vehicleExists = await getVehicleById(vehicleId);
	if (vehicleExists.rows.length === 0) {
		return vehicleExists;
	}

	// Merge existing vehicle data with the new payload
	// This ensures that only provided fields are updated
	console.log("Existing vehicle data:", vehicleExists.rows[0]);
	console.log("payload data:", payload);
	const updatedVehicle = { ...vehicleExists.rows[0], ...payload };
	console.log("Updated vehicle data:", updatedVehicle);
	const {
		vehicle_name,
		type,
		registration_number,
		daily_rent_price,
		availability_status,
	} = updatedVehicle;

	const result = await pool.query(
		`
			UPDATE vehicles
			SET vehicle_name = $1,
				type = $2,
				registration_number = $3,
				daily_rent_price = $4,
				availability_status = $5
			WHERE id = $6
			RETURNING *
		`,
		[
			vehicle_name,
			type,
			registration_number,
			daily_rent_price,
			availability_status,
			vehicleId,
		],
	);

	return result;
};

export const vehicleService = {
	createVehicle,
	getAllVehicles,
	getVehicleById,
	updateVehicle,
};
