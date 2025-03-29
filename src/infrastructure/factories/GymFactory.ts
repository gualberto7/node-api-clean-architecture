import { Gym } from "../../domain/entities/Gym";
import { MongoGymRepository } from "../repositories/MongoGymRepository";

export class GymFactory {
  constructor(private gymRepository: MongoGymRepository) {}

  async create(data: Partial<Gym> = {}): Promise<Gym> {
    const defaultGym: Partial<Gym> = {
      name: `Gym ${Math.random().toString(36).substring(7)}`,
      address: "Calle Principal 123",
      phone: "+1234567890",
      email: `gym${Math.random().toString(36).substring(7)}@example.com`,
      ownerId: data.ownerId || "",
      memberships: [],
      clients: [],
      staff: [],
      createdAt: new Date(),
      updatedAt: new Date(),
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
