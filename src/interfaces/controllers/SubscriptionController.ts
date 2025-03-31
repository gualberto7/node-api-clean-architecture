import { Response } from "express";
import { AuthRequest } from "../middleware/authMiddleware";
import { PaginationParams } from "../../domain/interfaces/PaginationParams";
import { ISubscriptionRepository } from "../../domain/repositories/ISubscriptionRepository";

export class SubscriptionController {
  constructor(private subscriptionRepository: ISubscriptionRepository) {}

  async createSubscription(req: AuthRequest, res: Response) {
    console.log(req.user);
    try {
      const data = {
        ...req.body,
        gym: req.params.gymId,
        createdBy: req.user?.name,
        updatedBy: req.user?.name,
      };
      const subscription = await this.subscriptionRepository.create(data);
      res.status(201).json(subscription);
    } catch (error) {
      res.status(500).json({ message: "Error creating subscription", error });
    }
  }

  async getSubscriptions(req: AuthRequest, res: Response) {
    const pagination: PaginationParams = {
      page: parseInt(req.query.page as string) || 1,
      limit: parseInt(req.query.limit as string) || 10,
      sortBy: (req.query.sortBy as string) || "createdAt",
      sortOrder: (req.query.sortOrder as "asc" | "desc") || "desc",
      path: `/api/gyms/${req.params.gymId}/subscriptions`,
    };
    try {
      const subscription = await this.subscriptionRepository.findByGymId(
        req.params.gymId,
        pagination
      );
      if (!subscription) {
        return res.status(404).json({ message: "Subscription not found" });
      }
      return res.json(subscription);
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Error fetching subscription", error });
    }
  }
}
