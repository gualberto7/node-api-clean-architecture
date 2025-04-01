import { Response } from "express";
import { AuthRequest } from "../middleware/authMiddleware";
import { IGymRepository } from "../../domain/repositories/IGymRepository";

export class GymController {
  constructor(private gymRepository: IGymRepository) {}

  async createGym(req: AuthRequest, res: Response) {
    const gymData = {
      ...req.body,
      user: req.user!.userId,
    };
    try {
      const gym = await this.gymRepository.create(gymData);
      res.status(201).json(gym);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ message: error });
      } else {
        res.status(500).json({ message: "Internal server error" });
      }
    }
  }

  async getGymById(req: AuthRequest, res: Response) {
    try {
      const gym = await this.gymRepository.findById(req.params.id);
      if (!gym) {
        return res.status(404).json({ message: "Gym not found" });
      }
      return res.json(gym);
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  async getGymsByOwner(req: AuthRequest, res: Response) {
    try {
      const gyms = await this.gymRepository.findByOwnerId(req.user!.userId);
      res.json(gyms);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  }

  async getAllGyms(req: AuthRequest, res: Response) {
    try {
      const gyms = await this.gymRepository.findAll({
        page: req.query.page ? parseInt(req.query.page as string) : 1,
        limit: req.query.limit ? parseInt(req.query.limit as string) : 10,
      });
      res.json(gyms);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  }

  async updateGym(req: AuthRequest, res: Response) {
    try {
      const gym = await this.gymRepository.findById(req.params.id);
      if (!gym) {
        return res.status(404).json({ message: "Gym not found" });
      }

      // Verificar que el usuario sea el propietario
      if (gym.user.toString() !== req.user!.userId) {
        return res
          .status(403)
          .json({ message: "Not authorized to update this gym" });
      }

      const updatedGym = await this.gymRepository.update(
        req.params.id,
        req.body
      );
      return res.json(updatedGym);
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  async deleteGym(req: AuthRequest, res: Response) {
    try {
      const gym = await this.gymRepository.findById(req.params.id);
      if (!gym) {
        return res.status(404).json({ message: "Gym not found" });
      }

      // Verificar que el usuario sea el propietario
      if (gym.user.toString() !== req.user!.userId) {
        return res
          .status(403)
          .json({ message: "Not authorized to delete this gym" });
      }

      await this.gymRepository.delete(req.params.id);
      return res.status(204).send();
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
  }
}
