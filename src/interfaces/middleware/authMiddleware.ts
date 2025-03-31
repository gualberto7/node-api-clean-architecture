import { Request, Response, NextFunction } from "express";
import { AuthService } from "../../infrastructure/services/AuthService";

export interface AuthRequest extends Request {
  user?: {
    userId: string;
    name: string;
    email: string;
  };
}

export const authMiddleware = (authService: AuthService) => {
  return async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const authHeader = req.headers.authorization;

      if (!authHeader) {
        res.status(401).json({ message: "No token provided" });
        return;
      }

      const token = authHeader.split(" ")[1];

      if (!token) {
        res.status(401).json({ message: "Invalid token format" });
        return;
      }

      const decoded = authService.verifyToken(token);
      req.user = decoded;
      next();
    } catch (error) {
      res.status(401).json({ message: "Invalid token" });
    }
  };
};
