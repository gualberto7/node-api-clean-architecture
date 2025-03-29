import { IClientRepository } from "../../domain/repositories/IClientRepository";
import { Client } from "../../domain/entities/Client";
import { ClientModel } from "../models/ClientModel";

export class MongoClientRepository implements IClientRepository {
  async create(client: Client): Promise<Client> {
    const newClient = await ClientModel.create(client);
    return newClient.toObject();
  }

  async findById(id: string): Promise<Client | null> {
    const client = await ClientModel.findById(id);
    return client ? client.toObject() : null;
  }

  async findByGymId(gymId: string): Promise<Client[]> {
    const clients = await ClientModel.find({ gymId });
    return clients.map((client) => client.toObject());
  }

  async findByCi(ci: string): Promise<Client | null> {
    const client = await ClientModel.findOne({ ci });
    return client ? client.toObject() : null;
  }

  async update(id: string, client: Partial<Client>): Promise<Client | null> {
    const updatedClient = await ClientModel.findByIdAndUpdate(
      id,
      { ...client, updatedAt: new Date() },
      { new: true }
    );
    return updatedClient ? updatedClient.toObject() : null;
  }

  async delete(id: string): Promise<boolean> {
    const result = await ClientModel.findByIdAndDelete(id);
    return !!result;
  }
}
