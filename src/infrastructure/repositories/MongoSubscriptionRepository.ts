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

    // Populate client and membership data
    const populatedData = await Promise.all(
      result.data.map(async (subscription) => {
        const populated = await subscription.populate([
          { path: "client", select: "name email phone" },
          { path: "membership", select: "name price duration status" },
        ]);
        return populated.toObject() as Subscription;
      })
    );

    return {
      ...result,
      data: populatedData,
    };
  }

  async findByClientIdAndGymId(
    clientId: string,
    gymId: string,
    pagination: PaginationParams
  ): Promise<PaginatedResponse<Subscription>> {
    const result = await this.paginate(
      { client: clientId, gym: gymId },
      pagination
    );

    const populatedData = await Promise.all(
      result.data.map(async (subscription) => {
        const populated = await subscription.populate([
          { path: "membership", select: "name price duration" },
        ]);
        return populated.toObject() as Subscription;
      })
    );

    return {
      ...result,
      data: populatedData,
    };
  }

  async findByClientId(
    clientId: string,
    pagination: PaginationParams
  ): Promise<PaginatedResponse<Subscription>> {
    const result = await this.paginate({ clientId }, pagination);

    // Populate client and membership data
    const populatedData = await Promise.all(
      result.data.map(async (subscription) => {
        const populated = await subscription.populate([
          { path: "client", select: "name email phone" },
          { path: "membership", select: "name price duration status" },
        ]);
        return populated.toObject() as Subscription;
      })
    );

    return {
      ...result,
      data: populatedData,
    };
  }

  async findByMembershipId(
    membershipId: string,
    pagination: PaginationParams
  ): Promise<PaginatedResponse<Subscription>> {
    const result = await this.paginate({ membershipId }, pagination);

    // Populate client and membership data
    const populatedData = await Promise.all(
      result.data.map(async (subscription) => {
        const populated = await subscription.populate([
          { path: "client", select: "name email phone" },
          { path: "membership", select: "name price duration status" },
        ]);
        return populated.toObject() as Subscription;
      })
    );

    return {
      ...result,
      data: populatedData,
    };
  }
}
