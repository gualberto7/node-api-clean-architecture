import { Response } from "express";
import { IClientRepository } from "../../domain/repositories/IClientRepository";
import { CreateClientUseCase } from "../../application/useCases/client/CreateClientUseCase";
import { AuthRequest } from "../middleware/authMiddleware";
import { PaginationParams } from "../../domain/interfaces/PaginationParams";

export class ClientController {
  constructor(private clientRepository: IClientRepository) {}

  async createClient(req: AuthRequest, res: Response) {
    try {
      const createClientUseCase = new CreateClientUseCase(
        this.clientRepository
      );
      const client = await createClientUseCase.execute(
        req.body,
        req.params.gymId
      );
      res.status(201).json(client);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(500).json({ message: "Internal server error" });
      }
    }
  }

  async getClientById(req: AuthRequest, res: Response) {
    try {
      const client = await this.clientRepository.findById(req.params.id);
      if (!client) {
        return res.status(404).json({ message: "Client not found" });
      }
      return res.json(client);
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  async getClientsByGym(req: AuthRequest, res: Response) {
    try {
      const pagination: PaginationParams = {
        page: parseInt(req.query.page as string) || 1,
        limit: parseInt(req.query.limit as string) || 10,
        sortBy: (req.query.sortBy as string) || "createdAt",
        sortOrder: (req.query.sortOrder as "asc" | "desc") || "desc",
        path: `/api/clients/gym/${req.params.gymId}`,
      };

      const result = await this.clientRepository.findByGymId(
        req.params.gymId,
        pagination
      );
      return res.json(result);
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  async getClientByCi(req: AuthRequest, res: Response) {
    try {
      const client = await this.clientRepository.findByCi(req.params.ci);
      if (!client) {
        return res.status(404).json({ message: "Client not found" });
      }
      return res.json(client);
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  async updateClient(req: AuthRequest, res: Response) {
    try {
      const client = await this.clientRepository.update(
        req.params.id,
        req.body
      );
      if (!client) {
        return res.status(404).json({ message: "Client not found" });
      }
      return res.json(client);
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  async deleteClient(req: AuthRequest, res: Response) {
    try {
      const result = await this.clientRepository.delete(req.params.id);
      if (!result) {
        return res.status(404).json({ message: "Client not found" });
      }
      return res.status(204).send();
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
  }
}
