import { Entry } from "../entities/Entry";
import {
  PaginationParams,
  PaginatedResponse,
} from "../interfaces/PaginationParams";

export interface IEntryRepository {
  create(entry: Entry): Promise<Entry>;
  findByGymId(
    gymId: string,
    pagination: PaginationParams
  ): Promise<PaginatedResponse<Entry>>;
  findByGymIdAndClientId(
    gymId: string,
    clientId: string,
    pagination: PaginationParams
  ): Promise<PaginatedResponse<Entry>>;
  findByGymIdAndMembershipId(
    gymId: string,
    membershipId: string,
    pagination: PaginationParams
  ): Promise<PaginatedResponse<Entry>>;
  findByClientIdAndSubscriptionId(
    clientId: string,
    subscriptionId: string,
    pagination: PaginationParams
  ): Promise<PaginatedResponse<Entry>>;
}
