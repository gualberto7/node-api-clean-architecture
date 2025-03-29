import { Gym } from "../entities/Gym";

export interface IGymRepository {
  create(gym: Gym): Promise<Gym>;
  findById(id: string): Promise<Gym | null>;
  findByOwnerId(ownerId: string): Promise<Gym[]>;
  findAll(): Promise<Gym[]>;
  update(id: string, gym: Partial<Gym>): Promise<Gym | null>;
  delete(id: string): Promise<boolean>;
}
