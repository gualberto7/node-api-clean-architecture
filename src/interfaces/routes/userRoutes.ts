import { Router, RequestHandler } from "express";
import { UserController } from "../controllers/UserController";
import { IUserRepository } from "../../domain/repositories/IUserRepository";

const wrapAsync = (fn: Function): RequestHandler => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res)).catch(next);
  };
};

export const createUserRoutes = (userRepository: IUserRepository) => {
  const router = Router();
  const userController = new UserController(userRepository);

  router.post("/", wrapAsync(userController.createUser.bind(userController)));
  router.get(
    "/:id",
    wrapAsync(userController.getUserById.bind(userController))
  );
  router.get("/", wrapAsync(userController.getAllUsers.bind(userController)));
  router.put("/:id", wrapAsync(userController.updateUser.bind(userController)));
  router.delete(
    "/:id",
    wrapAsync(userController.deleteUser.bind(userController))
  );

  return router;
};
