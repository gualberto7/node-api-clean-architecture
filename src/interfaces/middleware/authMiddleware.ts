import { Request, Response, NextFunction } from "express";
import { AuthService } from "../../infrastructure/services/AuthService";
import { MongoUserRepository } from "../../infrastructure/repositories/MongoUserRepository";

export interface AuthRequest extends Request {
  user?: {
    userId: string;
    name: string;
    email: string;
    role?: string;
    _id?: string;
    active?: boolean;
  };
}

export const authMiddleware = (authService: AuthService) => {
  const userRepository = new MongoUserRepository();

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

      // Recuperar el usuario completo desde la base de datos
      const user = await userRepository.findById(decoded.userId);

      if (!user) {
        res.status(401).json({ message: "User not found" });
        return;
      }

      // Verificar si el usuario está activo
      if (!user.active) {
        res.status(403).json({ message: "User account is deactivated" });
        return;
      }

      // Asignar el usuario completo a req.user
      req.user = {
        userId: user._id as string,
        name: user.name,
        email: user.email,
        role: user.role,
        _id: user._id as string,
        active: user.active,
      };

      next();
    } catch (error) {
      res.status(401).json({ message: "Invalid token" });
    }
  };
};
