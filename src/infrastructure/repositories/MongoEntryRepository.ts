import { IEntryRepository } from "../../domain/repositories/IEntryRepository";
import { Entry } from "../../domain/entities/Entry";
import { EntryModel } from "../models/EntryModel";
import {
  PaginationParams,
  PaginatedResponse,
} from "../../domain/interfaces/PaginationParams";
import { BaseRepository } from "../../domain/repositories/BaseRepository";
import { EntryDocument } from "../models/EntryModel";

export class MongoEntryRepository
  extends BaseRepository<EntryDocument>
  implements IEntryRepository
{
  constructor() {
    super(EntryModel);
  }

  async create(entry: Entry): Promise<Entry> {
    const newEntry = await this.model.create(entry);
    return newEntry.toObject() as Entry;
  }

  async findByGymId(
    gymId: string,
    pagination: PaginationParams
  ): Promise<PaginatedResponse<Entry>> {
    const result = await this.paginate({ gym: gymId }, pagination);

    const populatedData = await Promise.all(
      result.data.map(async (entry) => {
        const populated = await entry.populate([
          { path: "client", select: "name email phone" },
        ]);
        return populated.toObject() as Entry;
      })
    );

    return {
      ...result,
      data: populatedData,
    };
  }

  async findByGymIdAndClientId(
    gymId: string,
    clientId: string,
    pagination: PaginationParams
  ): Promise<PaginatedResponse<Entry>> {
    const result = await this.paginate(
      { gym: gymId, client: clientId },
      pagination
    );

    const populatedData = await Promise.all(
      result.data.map(async (entry) => {
        const populated = await entry.populate([
          { path: "client", select: "name email phone" },
        ]);
        return populated.toObject() as Entry;
      })
    );

    return {
      ...result,
      data: populatedData,
    };
  }

  async findByGymIdAndMembershipId(
    gymId: string,
    membershipId: string,
    pagination: PaginationParams
  ): Promise<PaginatedResponse<Entry>> {
    const result = await this.paginate(
      { gym: gymId, membership: membershipId },
      pagination
    );

    const populatedData = await Promise.all(
      result.data.map(async (entry) => {
        const populated = await entry.populate([
          { path: "client", select: "name email phone" },
        ]);
        return populated.toObject() as Entry;
      })
    );

    return {
      ...result,
      data: populatedData,
    };
  }

  async findByClientIdAndSubscriptionId(
    clientId: string,
    subscriptionId: string,
    pagination: PaginationParams
  ): Promise<PaginatedResponse<Entry>> {
    const result = await this.paginate(
      { client: clientId, subscription: subscriptionId },
      pagination
    );

    return {
      ...result,
      data: result.data.map((entry) => entry.toObject() as Entry),
    };
  }
}
