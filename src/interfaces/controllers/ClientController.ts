import { Response } from "express";
import { AuthRequest } from "../middleware/authMiddleware";
import { PaginationParams } from "../../domain/interfaces/PaginationParams";
import { IClientRepository } from "../../domain/repositories/IClientRepository";
import { ISubscriptionRepository } from "../../domain/repositories/ISubscriptionRepository";
export class ClientController {
  constructor(
    private clientRepository: IClientRepository,
    private subscriptionRepository: ISubscriptionRepository
  ) {}

  async createClient(req: AuthRequest, res: Response) {
    try {
      const data = {
        ...req.body,
        gym: req.params.gymId,
      };
      const client = await this.clientRepository.create(data);
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

  async getGymClientDetails(req: AuthRequest, res: Response) {
    try {
      const client = await this.clientRepository.findById(req.params.id);
      if (!client) {
        return res.status(404).json({ message: "Client not found" });
      }
      const subscription =
        await this.subscriptionRepository.findByClientIdAndGymId(
          client._id as string,
          req.params.gymId,
          { page: 1, limit: 100, sortBy: "createdAt", sortOrder: "desc" }
        );
      return res.json({ client, subscription });
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  async getClientsByGym(req: AuthRequest, res: Response) {
    try {
      console.log(req.user);
      const { name } = req.query;
      const pagination: PaginationParams = {
        page: parseInt(req.query.page as string) || 1,
        limit: parseInt(req.query.limit as string) || 10,
        sortBy: (req.query.sortBy as string) || "createdAt",
        sortOrder: (req.query.sortOrder as "asc" | "desc") || "desc",
        path: `/api/clients/gym/${req.params.gymId}`,
      };

      let result;
      if (name) {
        // Si hay un nombre, buscar por nombre dentro del gimnasio
        result = await this.clientRepository.findByNameAndGymId(
          name as string,
          req.params.gymId,
          pagination
        );
      } else {
        // Si no hay nombre, obtener todos los clientes del gimnasio
        result = await this.clientRepository.findByGymId(
          req.params.gymId,
          pagination
        );
      }

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
