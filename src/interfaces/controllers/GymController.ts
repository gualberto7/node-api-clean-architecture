import { Request, Response } from "express";
import { IGymRepository } from "../../domain/repositories/IGymRepository";
import { CreateGymUseCase } from "../../application/useCases/gym/CreateGymUseCase";
import { AuthRequest } from "../middleware/authMiddleware";

export class GymController {
  constructor(private gymRepository: IGymRepository) {}

  async createGym(req: AuthRequest, res: Response) {
    console.log(req.user);
    try {
      const createGymUseCase = new CreateGymUseCase(this.gymRepository);
      const gym = await createGymUseCase.execute(req.body, req.user!.userId);
      res.status(201).json(gym);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
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
      const gyms = await this.gymRepository.findAll();
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
      if (gym.ownerId !== req.user!.userId) {
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
      if (gym.ownerId !== req.user!.userId) {
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
