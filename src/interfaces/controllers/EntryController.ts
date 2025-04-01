import { Response } from "express";
import { AuthRequest } from "../middleware/authMiddleware";
import { IEntryRepository } from "../../domain/repositories/IEntryRepository";
import { PaginationParams } from "../../domain/interfaces/PaginationParams";
export class EntryController {
  constructor(private entryRepository: IEntryRepository) {}

  async createEntry(req: AuthRequest, res: Response) {
    try {
      const data = {
        ...req.body,
        gym: req.params.gymId,
        createdBy: req.user?.name,
        updatedBy: req.user?.name,
      };
      const entry = await this.entryRepository.create(data);
      return res.status(201).json(entry);
    } catch (error) {
      return res.status(500).json({ message: "Error creating entry", error });
    }
  }

  async getEntries(req: AuthRequest, res: Response) {
    const pagination: PaginationParams = {
      page: parseInt(req.query.page as string) || 1,
      limit: parseInt(req.query.limit as string) || 10,
      sortBy: (req.query.sortBy as string) || "createdAt",
      sortOrder: (req.query.sortOrder as "asc" | "desc") || "desc",
      path: `/api/gym/${req.params.gymId}/entries`,
    };
    try {
      const entries = await this.entryRepository.findByGymId(
        req.params.gymId,
        pagination
      );
      return res.json(entries);
    } catch (error) {
      return res.status(500).json({ message: "Error fetching entries", error });
    }
  }

  async getEntriesByClientId(req: AuthRequest, res: Response) {
    const pagination: PaginationParams = {
      page: parseInt(req.query.page as string) || 1,
      limit: parseInt(req.query.limit as string) || 10,
      sortBy: (req.query.sortBy as string) || "createdAt",
      sortOrder: (req.query.sortOrder as "asc" | "desc") || "desc",
      path: `/api/gym/${req.params.gymId}/entries/client/${req.params.clientId}`,
    };
    try {
      const entries = await this.entryRepository.findByGymIdAndClientId(
        req.params.gymId,
        req.params.clientId,
        pagination
      );
      return res.json(entries);
    } catch (error) {
      return res.status(500).json({ message: "Error fetching entries", error });
    }
  }

  async getEntriesByMembershipId(req: AuthRequest, res: Response) {
    const pagination: PaginationParams = {
      page: parseInt(req.query.page as string) || 1,
      limit: parseInt(req.query.limit as string) || 10,
      sortBy: (req.query.sortBy as string) || "createdAt",
      sortOrder: (req.query.sortOrder as "asc" | "desc") || "desc",
      path: `/api/gym/${req.params.gymId}/entries/membership/${req.params.membershipId}`,
    };
    try {
      const entries = await this.entryRepository.findByGymIdAndMembershipId(
        req.params.gymId,
        req.params.membershipId,
        pagination
      );
      return res.json(entries);
    } catch (error) {
      return res.status(500).json({ message: "Error fetching entries", error });
    }
  }

  async getEntriesByClientIdAndSubscriptionId(req: AuthRequest, res: Response) {
    const pagination: PaginationParams = {
      page: parseInt(req.query.page as string) || 1,
      limit: parseInt(req.query.limit as string) || 10,
      sortBy: (req.query.sortBy as string) || "createdAt",
      sortOrder: (req.query.sortOrder as "asc" | "desc") || "desc",
      path: `/api/gym/${req.params.gymId}/entries/client/${req.params.clientId}/subscription/${req.params.subscriptionId}`,
    };
    try {
      const entries =
        await this.entryRepository.findByClientIdAndSubscriptionId(
          req.params.clientId,
          req.params.subscriptionId,
          pagination
        );
      return res.json(entries);
    } catch (error) {
      return res.status(500).json({ message: "Error fetching entries", error });
    }
  }
}
