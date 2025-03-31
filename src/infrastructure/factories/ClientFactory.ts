import { faker } from "@faker-js/faker";
import { Client } from "../../domain/entities/Client";
import { MongoClientRepository } from "../repositories/MongoClientRepository";
import { ObjectId } from "mongoose";

export class ClientFactory {
  constructor(private clientRepository: MongoClientRepository) {}

  async create(data: Partial<Client> = {}): Promise<Client> {
    const defaultClient: Partial<Client> = {
      ci: faker.string.numeric(8),
      name: faker.person.fullName(),
      email: faker.internet.email(),
      phone: faker.phone.number(),
      gym: data.gym as ObjectId,
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
