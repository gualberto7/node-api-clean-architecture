import { Subscription } from "../entities/Subscription";
import {
  PaginationParams,
  PaginatedResponse,
} from "../interfaces/PaginationParams";

export interface ISubscriptionRepository {
  create(subscription: Subscription): Promise<Subscription>;
  findByGymId(
    gymId: string,
    pagination: PaginationParams
  ): Promise<PaginatedResponse<Subscription>>;
  findByClientId(
    clientId: string,
    pagination: PaginationParams
  ): Promise<PaginatedResponse<Subscription>>;
  findByMembershipId(
    membershipId: string,
    pagination: PaginationParams
  ): Promise<PaginatedResponse<Subscription>>;
}
