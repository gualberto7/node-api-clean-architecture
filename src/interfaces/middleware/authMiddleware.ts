import { Request, Response, NextFunction } from "express";
import { AuthService } from "../../infrastructure/services/AuthService";

export interface AuthRequest extends Request {
  user?: {
    userId: string;
    email: string;
  };
}

export const authMiddleware = (authService: AuthService) => {
  return async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const authHeader = req.headers.authorization;

      if (!authHeader) {
        return res.status(401).json({ message: "No token provided" });
      }

      const token = authHeader.split(" ")[1];

      if (!token) {
        return res.status(401).json({ message: "Invalid token format" });
      }

      const decoded = authService.verifyToken(token);
      req.user = decoded;
      next();
    } catch (error) {
      return res.status(401).json({ message: "Invalid token" });
    }
  };
};
