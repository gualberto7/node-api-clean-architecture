import { Router } from "express";
import { ClientController } from "../controllers/ClientController";
import { IClientRepository } from "../../domain/repositories/IClientRepository";
import { wrapAsync } from "../middleware/asyncHandler";

export const createClientRoutes = (clientRepository: IClientRepository) => {
  const router = Router();
  const clientController = new ClientController(clientRepository);

  router.post(
    "/gym/:gymId",
    wrapAsync(clientController.createClient.bind(clientController))
  );
  router.get(
    "/gym/:gymId",
    wrapAsync(clientController.getClientsByGym.bind(clientController))
  );
  router.get(
    "/ci/:ci",
    wrapAsync(clientController.getClientByCi.bind(clientController))
  );
  router.get(
    "/:id",
    wrapAsync(clientController.getClientById.bind(clientController))
  );
  router.put(
    "/:id",
    wrapAsync(clientController.updateClient.bind(clientController))
  );
  router.delete(
    "/:id",
    wrapAsync(clientController.deleteClient.bind(clientController))
  );

  return router;
};
