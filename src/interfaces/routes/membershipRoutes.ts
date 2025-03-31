import { Router } from "express";
import { MembershipController } from "../controllers/MembershipController";
import { IMembershipRepository } from "../../domain/repositories/IMembershipRepository";
import { wrapAsync } from "../middleware/asyncHandler";

export const createMembershipRoutes = (
  membershipRepository: IMembershipRepository
) => {
  const router = Router();
  const membershipController = new MembershipController(membershipRepository);

  // GET /api/entities/gym/:gymId/memberships
  router.get(
    "/gym/:gymId/memberships",
    wrapAsync(
      membershipController.getMembershipsByGym.bind(membershipController)
    )
  );

  // GET /api/entities/gym/:gymId/memberships/:id
  router.get(
    "/gym/:gymId/memberships/:id",
    wrapAsync(
      membershipController.getMembershipsByGym.bind(membershipController)
    )
  );

  // POST /api/entities/gym/:gymId/memberships
  router.post(
    "/gym/:gymId/memberships",
    wrapAsync(membershipController.createMembership.bind(membershipController))
  );

  // PUT /api/entities/gym/:gymId/memberships/:id
  router.put(
    "/gym/:gymId/memberships/:id",
    wrapAsync(membershipController.updateMembership.bind(membershipController))
  );

  // DELETE /api/entities/gym/:gymId/memberships/:id
  router.delete(
    "/gym/:gymId/memberships/:id",
    wrapAsync(membershipController.deleteMembership.bind(membershipController))
  );

  // PATCH /api/entities/gym/:gymId/memberships/:id/status
  router.patch(
    "/gym/:gymId/memberships/:id/status",
    wrapAsync(
      membershipController.updateMembershipStatus.bind(membershipController)
    )
  );

  return router;
};
