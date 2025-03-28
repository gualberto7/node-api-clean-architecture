import { Router, RequestHandler } from "express";
import { AuthController } from "../controllers/AuthController";
import { IUserRepository } from "../../domain/repositories/IUserRepository";
import { AuthService } from "../../infrastructure/services/AuthService";

const wrapAsync = (fn: Function): RequestHandler => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res)).catch(next);
  };
};

export const createAuthRoutes = (
  userRepository: IUserRepository,
  authService: AuthService
) => {
  const router = Router();
  const authController = new AuthController(userRepository, authService);

  router.post("/login", wrapAsync(authController.login.bind(authController)));

  return router;
};
