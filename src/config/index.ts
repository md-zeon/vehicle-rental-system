import dotenv from "dotenv";
import path from "path";
dotenv.config({
	path: path.join(process.cwd(), ".env"),
});

const CONFIG = {
	PORT: process.env.PORT || 5000,
	DB_CONNECTION_STRING: process.env.DB_CONNECTION_STRING || "",
	JWT_SECRET: process.env.JWT_SECRET,
};

export default CONFIG;
