import { IGymRepository } from "../../domain/repositories/IGymRepository";
import { Gym } from "../../domain/entities/Gym";
import { GymModel } from "../models/GymModel";
import {
  PaginationParams,
  PaginatedResponse,
} from "../../domain/interfaces/PaginationParams";
import { BaseRepository } from "../../domain/repositories/BaseRepository";
import { GymDocument } from "../models/GymModel";

export class MongoGymRepository
  extends BaseRepository<GymDocument>
  implements IGymRepository
{
  constructor() {
    super(GymModel);
  }

  async create(gym: Gym): Promise<Gym> {
    const newGym = await this.model.create(gym);
    return newGym.toObject() as Gym;
  }

  async findById(id: string): Promise<Gym | null> {
    const gym = await this.model.findById(id);
    return gym ? (gym.toObject() as Gym) : null;
  }

  async findByOwnerId(ownerId: string): Promise<Gym[]> {
    const gyms = await this.model.find({ ownerId });
    return gyms.map((gym) => gym.toObject() as Gym);
  }

  async findAll(pagination: PaginationParams): Promise<PaginatedResponse<Gym>> {
    const result = await this.paginate({}, pagination);
    return {
      ...result,
      data: result.data.map((gym) => gym.toObject() as Gym),
    };
  }

  async update(id: string, gym: Partial<Gym>): Promise<Gym | null> {
    const updatedGym = await this.model.findByIdAndUpdate(
      id,
      { ...gym, updatedAt: new Date() },
      { new: true }
    );
    return updatedGym ? (updatedGym.toObject() as Gym) : null;
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.model.findByIdAndDelete(id);
    return !!result;
  }
}
