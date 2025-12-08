import { Pool } from "pg";
import CONFIG from ".";

export const pool = new Pool({
	connectionString: CONFIG.DB_CONNECTION_STRING,
});

const initializeDB = async () => {
	await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(150) UNIQUE NOT NULL CHECK (email = LOWER(email)),
        password TEXT NOT NULL CHECK (LENGTH(password) >= 6),
        phone VARCHAR(15) NOT NULL,
        role VARCHAR(20) NOT NULL CHECK (role IN ('admin', 'customer'))
      )  
    `);
};

export default initializeDB;
