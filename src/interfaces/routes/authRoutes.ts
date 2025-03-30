import { Router, RequestHandler } from "express";
import { AuthController } from "../controllers/AuthController";
import { IUserRepository } from "../../domain/repositories/IUserRepository";
import { AuthService } from "../../infrastructure/services/AuthService";
import { authMiddleware } from "../middleware/authMiddleware";
import { IGymRepository } from "../../domain/repositories/IGymRepository";
const wrapAsync = (fn: Function): RequestHandler => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res)).catch(next);
  };
};

export const createAuthRoutes = (
  userRepository: IUserRepository,
  gymRepository: IGymRepository,
  authService: AuthService
) => {
  const router = Router();
  const authController = new AuthController(
    userRepository,
    gymRepository,
    authService
  );

  router.post("/login", wrapAsync(authController.login.bind(authController)));
  router.post("/logout", wrapAsync(authController.logout.bind(authController)));
  router.get(
    "/me",
    authMiddleware(authService),
    wrapAsync(authController.me.bind(authController))
  );
  return router;
};
