import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import CONFIG from "../config";

type Role = "admin" | "customer";

const authorize = (...roles: Role[]) => {
	return async (req: Request, res: Response, next: NextFunction) => {
		try {
			const authHeader = req.headers.authorization;

			if (!authHeader || !authHeader.startsWith("Bearer ")) {
				return res.status(401).json({
					success: false,
					message: "Unauthorized: No token provided",
				});
			}

			const token = authHeader.split(" ")[1] as string;

			const decoded = jwt.verify(
				token,
				CONFIG.JWT_SECRET as string,
			) as JwtPayload;

			if (roles.length && !roles.includes(decoded.role)) {
				return res.status(403).json({
					success: false,
					message: "Forbidden: You don't have enough permissions",
				});
			}

			next();
		} catch (error: any) {
			res.status(401).json({
				success: false,
				message: error.message || "Unauthorized: Access is denied",
				errors: error,
			});
		}
	};
};

export default authorize;
