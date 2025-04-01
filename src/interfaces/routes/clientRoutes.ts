import { Router } from "express";
import { ClientController } from "../controllers/ClientController";
import { IClientRepository } from "../../domain/repositories/IClientRepository";
import { wrapAsync } from "../middleware/asyncHandler";
import { ISubscriptionRepository } from "../../domain/repositories/ISubscriptionRepository";

export const createClientRoutes = (
  clientRepository: IClientRepository,
  subscriptionRepository: ISubscriptionRepository
) => {
  const router = Router();
  const clientController = new ClientController(
    clientRepository,
    subscriptionRepository
  );

  router.post(
    "/gym/:gymId/clients",
    wrapAsync(clientController.createClient.bind(clientController))
  );
  router.get(
    "/gym/:gymId/clients",
    wrapAsync(clientController.getClientsByGym.bind(clientController))
  );
  router.get(
    "/gym/:gymId/clients/:id",
    wrapAsync(clientController.getGymClientDetails.bind(clientController))
  );
  router.get(
    "/clients/:ci",
    wrapAsync(clientController.getClientByCi.bind(clientController))
  );
  router.get(
    "/clients/:id",
    wrapAsync(clientController.getClientById.bind(clientController))
  );
  router.put(
    "/clients/:id",
    wrapAsync(clientController.updateClient.bind(clientController))
  );
  router.delete(
    "/clients/:id",
    wrapAsync(clientController.deleteClient.bind(clientController))
  );

  return router;
};
