import { Router } from "express";
import { IEntryRepository } from "../../domain/repositories/IEntryRepository";
import { EntryController } from "../controllers/EntryController";
import { wrapAsync } from "../middleware/asyncHandler";

export const createEntryRoutes = (entryRepository: IEntryRepository) => {
  const router = Router();
  const entryController = new EntryController(entryRepository);

  router.post(
    "/gym/:gymId/entries",
    wrapAsync(entryController.createEntry.bind(entryController))
  );
  router.get(
    "/gym/:gymId/entries",
    wrapAsync(entryController.getEntries.bind(entryController))
  );
  router.get(
    "/gym/:gymId/entries/client/:clientId",
    wrapAsync(entryController.getEntriesByClientId.bind(entryController))
  );
  router.get(
    "/gym/:gymId/entries/membership/:membershipId",
    wrapAsync(entryController.getEntriesByMembershipId.bind(entryController))
  );

  return router;
};
