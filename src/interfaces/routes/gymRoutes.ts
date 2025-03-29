import { Router } from "express";
import { GymController } from "../controllers/GymController";
import { IGymRepository } from "../../domain/repositories/IGymRepository";
import { wrapAsync } from "../middleware/asyncHandler";

export const createGymRoutes = (gymRepository: IGymRepository) => {
  const router = Router();
  const gymController = new GymController(gymRepository);

  router.post("/", wrapAsync(gymController.createGym.bind(gymController)));
  router.get(
    "/owner/:ownerId",
    wrapAsync(gymController.getGymsByOwner.bind(gymController))
  );
  router.get("/:id", wrapAsync(gymController.getGymById.bind(gymController)));
  router.get("/", wrapAsync(gymController.getAllGyms.bind(gymController)));
  router.put("/:id", wrapAsync(gymController.updateGym.bind(gymController)));
  router.delete("/:id", wrapAsync(gymController.deleteGym.bind(gymController)));

  return router;
};
