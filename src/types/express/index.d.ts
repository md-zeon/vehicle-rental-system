import { JwtPayload } from "jsonwebtoken";

// extending global namespace to add custom types
declare global {
	// extending the Express namespace
	namespace Express {
		// adding new properties to existing Request interface
		interface Request {
			// adding user property to Request interface
			user?: JwtPayload; // user property will hold the decoded JWT payload
		}
	}
}
