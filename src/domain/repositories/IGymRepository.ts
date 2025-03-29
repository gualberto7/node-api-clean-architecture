import { Gym } from "../entities/Gym";
import {
  PaginationParams,
  PaginatedResponse,
} from "../interfaces/PaginationParams";

export interface IGymRepository {
  create(gym: Gym): Promise<Gym>;
  findById(id: string): Promise<Gym | null>;
  findByOwnerId(ownerId: string): Promise<Gym[]>;
  findAll(pagination: PaginationParams): Promise<PaginatedResponse<Gym>>;
  update(id: string, gym: Partial<Gym>): Promise<Gym | null>;
  delete(id: string): Promise<boolean>;
}
