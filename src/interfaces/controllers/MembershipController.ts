import { Request, Response } from "express";
import { IMembershipRepository } from "../../domain/repositories/IMembershipRepository";
import { AuthRequest } from "../middleware/authMiddleware";

export class MembershipController {
  constructor(private membershipRepository: IMembershipRepository) {}

  async createMembership(req: AuthRequest, res: Response) {
    try {
      const data = {
        ...req.body,
        gym: req.params.gymId,
        createdBy: req.user?.name,
        updatedBy: req.user?.name,
      };
      const membership = await this.membershipRepository.create(data);
      res.status(201).json(membership);
    } catch (error) {
      res.status(500).json({ message: "Error creating membership", error });
    }
  }

  async getMembership(req: Request, res: Response) {
    try {
      const membership = await this.membershipRepository.findById(
        req.params.id
      );
      if (!membership) {
        return res.status(404).json({ message: "Membership not found" });
      }
      return res.json(membership);
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Error fetching membership", error });
    }
  }

  async getMembershipsByGym(req: Request, res: Response) {
    try {
      const memberships = await this.membershipRepository.findByGymId(
        req.params.gymId
      );
      res.json(memberships);
    } catch (error) {
      res.status(500).json({ message: "Error fetching memberships", error });
    }
  }

  async updateMembership(req: Request, res: Response) {
    try {
      const membership = await this.membershipRepository.update(
        req.params.id,
        req.body
      );
      if (!membership) {
        return res.status(404).json({ message: "Membership not found" });
      }
      return res.json(membership);
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Error updating membership", error });
    }
  }

  async deleteMembership(req: Request, res: Response) {
    try {
      const deleted = await this.membershipRepository.delete(req.params.id);
      if (!deleted) {
        return res.status(404).json({ message: "Membership not found" });
      }
      return res.status(204).send();
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Error deleting membership", error });
    }
  }

  async updateMembershipStatus(req: Request, res: Response) {
    try {
      const membership = await this.membershipRepository.updateStatus(
        req.params.id,
        req.body.status
      );
      if (!membership) {
        return res.status(404).json({ message: "Membership not found" });
      }
      return res.json(membership);
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Error updating membership status", error });
    }
  }
}
