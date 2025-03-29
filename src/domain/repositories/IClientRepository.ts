import { Client } from "../entities/Client";
import {
  PaginationParams,
  PaginatedResponse,
} from "../interfaces/PaginationParams";

export interface IClientRepository {
  create(client: Client): Promise<Client>;
  findById(id: string): Promise<Client | null>;
  findByGymId(
    gymId: string,
    pagination: PaginationParams
  ): Promise<PaginatedResponse<Client>>;
  findByCi(ci: string): Promise<Client | null>;
  findByName(
    name: string,
    pagination: PaginationParams
  ): Promise<PaginatedResponse<Client>>;
  update(id: string, client: Partial<Client>): Promise<Client | null>;
  delete(id: string): Promise<boolean>;
}
