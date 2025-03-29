import { Client } from "../../domain/entities/Client";
import { MongoClientRepository } from "../repositories/MongoClientRepository";

export class ClientFactory {
  constructor(private clientRepository: MongoClientRepository) {}

  async create(data: Partial<Client> = {}): Promise<Client> {
    const defaultClient: Partial<Client> = {
      ci: Math.random().toString().slice(2, 10),
      name: "Juan",
      email: `client${Math.random().toString(36).substring(7)}@example.com`,
      phone: "+1234567890",
      gymId: data.gymId || "",
      subscriptionId: undefined,
      birthDate: new Date("1990-01-01"),
      gender: "M",
      address: "Calle Principal 123",
      emergencyContact: {
        name: "María",
        phone: "+9876543210",
        relationship: "Esposa",
      },
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const clientData = { ...defaultClient, ...data };
    return this.clientRepository.create(clientData as Client);
  }

  async createMany(
    count: number,
    data: Partial<Client> = {}
  ): Promise<Client[]> {
    const clients: Client[] = [];
    for (let i = 0; i < count; i++) {
      clients.push(await this.create(data));
    }
    return clients;
  }
}
