import { ISubscriptionRepository } from "../../domain/repositories/ISubscriptionRepository";
import { Subscription } from "../../domain/entities/Subscription";
import { SubscriptionModel } from "../models/SubscriptionModel";
import {
  PaginationParams,
  PaginatedResponse,
} from "../../domain/interfaces/PaginationParams";
import { BaseRepository } from "../../domain/repositories/BaseRepository";
import { SubscriptionDocument } from "../models/SubscriptionModel";

export class MongoSubscriptionRepository
  extends BaseRepository<SubscriptionDocument>
  implements ISubscriptionRepository
{
  constructor() {
    super(SubscriptionModel);
  }

  async create(subscription: Subscription): Promise<Subscription> {
    const newSubscription = await this.model.create(subscription);
    return newSubscription.toObject() as Subscription;
  }

  async findByGymId(
    gymId: string,
    pagination: PaginationParams
  ): Promise<PaginatedResponse<Subscription>> {
    const result = await this.paginate({ gym: gymId }, pagination);
    return {
      ...result,
      data: result.data.map(
        (subscription) => subscription.toObject() as Subscription
      ),
    };
  }

  async findByClientId(
    clientId: string,
    pagination: PaginationParams
  ): Promise<PaginatedResponse<Subscription>> {
    const result = await this.paginate({ clientId }, pagination);
    return {
      ...result,
      data: result.data.map(
        (subscription) => subscription.toObject() as Subscription
      ),
    };
  }

  async findByMembershipId(
    membershipId: string,
    pagination: PaginationParams
  ): Promise<PaginatedResponse<Subscription>> {
    const result = await this.paginate({ membershipId }, pagination);
    return {
      ...result,
      data: result.data.map(
        (subscription) => subscription.toObject() as Subscription
      ),
    };
  }
}
