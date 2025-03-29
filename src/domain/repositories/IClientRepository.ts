import { Client } from "../entities/Client";

export interface IClientRepository {
  create(client: Client): Promise<Client>;
  findById(id: string): Promise<Client | null>;
  findByGymId(gymId: string): Promise<Client[]>;
  findByCi(ci: string): Promise<Client | null>;
  update(id: string, client: Partial<Client>): Promise<Client | null>;
  delete(id: string): Promise<boolean>;
}
