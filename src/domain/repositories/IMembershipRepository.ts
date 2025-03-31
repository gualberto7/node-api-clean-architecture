import { Membership } from "../entities/Membership";
import {
  PaginationParams,
  PaginatedResponse,
} from "../interfaces/PaginationParams";

export interface IMembershipRepository {
  create(membership: Membership): Promise<Membership>;
  findById(id: string): Promise<Membership | null>;
  findByGymId(gymId: string): Promise<Membership[]>;
  findByClientId(clientId: string): Promise<Membership[]>;
  update(
    id: string,
    membership: Partial<Membership>
  ): Promise<Membership | null>;
  delete(id: string): Promise<boolean>;
  updateStatus(id: string, status: string): Promise<Membership | null>;
}
