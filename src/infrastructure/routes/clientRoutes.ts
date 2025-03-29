import { Router } from "express";
import { ClientController } from "../../application/controllers/ClientController";
import { MongoClientRepository } from "../repositories/MongoClientRepository";

const router = Router();
const clientRepository = new MongoClientRepository();
const clientController = new ClientController(clientRepository);

router.post("/", clientController.createClient.bind(clientController));
router.get("/:id", clientController.getClient.bind(clientController));
router.get(
  "/gym/:gymId",
  clientController.getClientsByGym.bind(clientController)
);
router.get(
  "/search/name",
  clientController.searchClientsByName.bind(clientController)
);
router.put("/:id", clientController.updateClient.bind(clientController));
router.delete("/:id", clientController.deleteClient.bind(clientController));

export default router;
