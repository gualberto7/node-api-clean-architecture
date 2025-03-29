import { faker } from "@faker-js/faker";
import { Client } from "../../domain/entities/Client";
import { MongoClientRepository } from "../repositories/MongoClientRepository";

export class ClientFactory {
  constructor(private clientRepository: MongoClientRepository) {}

  async create(data: Partial<Client> = {}): Promise<Client> {
    const defaultClient: Partial<Client> = {
      ci: Math.random().toString().slice(2, 10),
      name: faker.person.fullName(),
      email: faker.internet.email(),
      phone: faker.phone.number(),
      gymId: data.gymId || "",
      subscriptionId: undefined,
      birthDate: faker.date.birthdate(),
      gender: faker.person.gender(),
      address: faker.location.streetAddress(),
      emergencyContact: {
        name: faker.person.fullName(),
        phone: faker.phone.number(),
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
