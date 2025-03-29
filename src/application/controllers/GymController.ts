import { Request, Response } from "express";
import { IGymRepository } from "../../domain/repositories/IGymRepository";
import { PaginationParams } from "../../domain/interfaces/PaginationParams";

export class GymController {
  constructor(private gymRepository: IGymRepository) {}

  async createGym(req: Request, res: Response): Promise<void> {
    try {
      const gym = await this.gymRepository.create(req.body);
      res.status(201).json(gym);
    } catch (error) {
      res.status(500).json({ error: "Error creating gym" });
    }
  }

  async getGym(req: Request, res: Response): Promise<void> {
    try {
      const gym = await this.gymRepository.findById(req.params.id);
      if (!gym) {
        res.status(404).json({ error: "Gym not found" });
        return;
      }
      res.json(gym);
    } catch (error) {
      res.status(500).json({ error: "Error fetching gym" });
    }
  }

  async getGyms(req: Request, res: Response): Promise<void> {
    try {
      const pagination: PaginationParams = {
        page: parseInt(req.query.page as string) || 1,
        limit: parseInt(req.query.limit as string) || 10,
        sortBy: (req.query.sortBy as string) || "createdAt",
        sortOrder: (req.query.sortOrder as "asc" | "desc") || "desc",
        path: req.baseUrl,
      };

      const result = await this.gymRepository.findAll(pagination);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: "Error fetching gyms" });
    }
  }

  async getGymsByOwner(req: Request, res: Response): Promise<void> {
    try {
      const gyms = await this.gymRepository.findByOwnerId(req.params.ownerId);
      res.json(gyms);
    } catch (error) {
      res.status(500).json({ error: "Error fetching owner's gyms" });
    }
  }

  async updateGym(req: Request, res: Response): Promise<void> {
    try {
      const gym = await this.gymRepository.update(req.params.id, req.body);
      if (!gym) {
        res.status(404).json({ error: "Gym not found" });
        return;
      }
      res.json(gym);
    } catch (error) {
      res.status(500).json({ error: "Error updating gym" });
    }
  }

  async deleteGym(req: Request, res: Response): Promise<void> {
    try {
      const deleted = await this.gymRepository.delete(req.params.id);
      if (!deleted) {
        res.status(404).json({ error: "Gym not found" });
        return;
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Error deleting gym" });
    }
  }
}
