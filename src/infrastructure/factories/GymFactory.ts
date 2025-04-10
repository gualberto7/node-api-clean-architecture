import { faker } from "@faker-js/faker/.";
import { Gym } from "../../domain/entities/Gym";
import { MongoGymRepository } from "../repositories/MongoGymRepository";

export class GymFactory {
  constructor(private gymRepository: MongoGymRepository) {}

  async create(data: Partial<Gym> = {}): Promise<Gym> {
    const defaultGym: Partial<Gym> = {
      name: faker.company.name(),
      address: faker.location.streetAddress(),
      phone: faker.phone.number(),
      email: faker.internet.email(),
      user: data.user,
    };

    const gymData = { ...defaultGym, ...data };
    return this.gymRepository.create(gymData as Gym);
  }

  async createMany(count: number, data: Partial<Gym> = {}): Promise<Gym[]> {
    const gyms: Gym[] = [];
    for (let i = 0; i < count; i++) {
      gyms.push(await this.create(data));
    }
    return gyms;
  }
}
