import { Router } from "express";
import { SubscriptionController } from "../controllers/SubscriptionController";
import { ISubscriptionRepository } from "../../domain/repositories/ISubscriptionRepository";
import { wrapAsync } from "../middleware/asyncHandler";

export const createSubscriptionRoutes = (
  subscriptionRepository: ISubscriptionRepository
) => {
  const router = Router();
  const subscriptionController = new SubscriptionController(
    subscriptionRepository
  );

  router.post(
    "/gym/:gymId/subscriptions",
    wrapAsync(
      subscriptionController.createSubscription.bind(subscriptionController)
    )
  );
  router.get(
    "/gym/:gymId/subscriptions",
    wrapAsync(
      subscriptionController.getSubscriptions.bind(subscriptionController)
    )
  );

  return router;
};
