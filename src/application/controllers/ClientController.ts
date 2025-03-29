import { Request, Response } from "express";
import { IClientRepository } from "../../domain/repositories/IClientRepository";
import { PaginationParams } from "../../domain/interfaces/PaginationParams";

export class ClientController {
  constructor(private clientRepository: IClientRepository) {}

  async createClient(req: Request, res: Response): Promise<void> {
    try {
      const client = await this.clientRepository.create(req.body);
      res.status(201).json(client);
    } catch (error) {
      res.status(500).json({ error: "Error creating client" });
    }
  }

  async getClient(req: Request, res: Response): Promise<void> {
    try {
      const client = await this.clientRepository.findById(req.params.id);
      if (!client) {
        res.status(404).json({ error: "Client not found" });
        return;
      }
      res.json(client);
    } catch (error) {
      res.status(500).json({ error: "Error fetching client" });
    }
  }

  async getClientsByGym(req: Request, res: Response): Promise<void> {
    try {
      const pagination: PaginationParams = {
        page: parseInt(req.query.page as string) || 1,
        limit: parseInt(req.query.limit as string) || 10,
        sortBy: (req.query.sortBy as string) || "createdAt",
        sortOrder: (req.query.sortOrder as "asc" | "desc") || "desc",
        path: req.baseUrl,
      };

      const result = await this.clientRepository.findByGymId(
        req.params.gymId,
        pagination
      );
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: "Error fetching clients" });
    }
  }

  async searchClientsByName(req: Request, res: Response): Promise<void> {
    try {
      const { name } = req.query;
      if (!name || typeof name !== "string") {
        res.status(400).json({ error: "Name parameter is required" });
        return;
      }

      const pagination: PaginationParams = {
        page: parseInt(req.query.page as string) || 1,
        limit: parseInt(req.query.limit as string) || 10,
        sortBy: (req.query.sortBy as string) || "createdAt",
        sortOrder: (req.query.sortOrder as "asc" | "desc") || "desc",
        path: req.baseUrl,
      };

      const result = await this.clientRepository.findByName(name, pagination);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: "Error searching clients" });
    }
  }

  async updateClient(req: Request, res: Response): Promise<void> {
    try {
      const client = await this.clientRepository.update(
        req.params.id,
        req.body
      );
      if (!client) {
        res.status(404).json({ error: "Client not found" });
        return;
      }
      res.json(client);
    } catch (error) {
      res.status(500).json({ error: "Error updating client" });
    }
  }

  async deleteClient(req: Request, res: Response): Promise<void> {
    try {
      const deleted = await this.clientRepository.delete(req.params.id);
      if (!deleted) {
        res.status(404).json({ error: "Client not found" });
        return;
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Error deleting client" });
    }
  }
}
