import { IClientRepository } from "../../domain/repositories/IClientRepository";
import { Client } from "../../domain/entities/Client";
import { ClientModel } from "../models/ClientModel";
import {
  PaginationParams,
  PaginatedResponse,
} from "../../domain/interfaces/PaginationParams";
import { BaseRepository } from "../../domain/repositories/BaseRepository";
import { ClientDocument } from "../models/ClientModel";

export class MongoClientRepository
  extends BaseRepository<ClientDocument>
  implements IClientRepository
{
  constructor() {
    super(ClientModel);
  }

  async create(client: Client): Promise<Client> {
    const newClient = await this.model.create(client);
    return newClient.toObject() as Client;
  }

  async findById(id: string): Promise<Client | null> {
    const client = await this.model.findById(id);
    return client ? (client.toObject() as Client) : null;
  }

  async findByGymId(
    gymId: string,
    pagination: PaginationParams
  ): Promise<PaginatedResponse<Client>> {
    const result = await this.paginate({ gym: gymId }, pagination);

    return {
      ...result,
      data: result.data.map((client) => client.toObject() as Client),
    };
  }

  async findByCi(ci: string): Promise<Client | null> {
    const client = await this.model.findOne({ ci });
    return client ? (client.toObject() as Client) : null;
  }

  async findByNameAndGymId(
    name: string,
    gymId: string,
    pagination: PaginationParams
  ): Promise<PaginatedResponse<Client>> {
    const query = {
      gymId,
      name: { $regex: name, $options: "i" },
    };
    const result = await this.paginate(query, pagination);

    return {
      ...result,
      data: result.data.map((client) => client.toObject() as Client),
    };
  }

  async findByName(
    name: string,
    pagination: PaginationParams
  ): Promise<PaginatedResponse<Client>> {
    const result = await this.paginate(
      { name: { $regex: name, $options: "i" } },
      pagination
    );
    return {
      ...result,
      data: result.data.map((client) => client.toObject() as Client),
    };
  }

  async update(id: string, client: Partial<Client>): Promise<Client | null> {
    const updatedClient = await this.model.findByIdAndUpdate(
      id,
      { ...client, updatedAt: new Date() },
      { new: true }
    );
    return updatedClient ? (updatedClient.toObject() as Client) : null;
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.model.findByIdAndDelete(id);
    return !!result;
  }
}
