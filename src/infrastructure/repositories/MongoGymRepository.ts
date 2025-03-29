import { IGymRepository } from "../../domain/repositories/IGymRepository";
import { Gym } from "../../domain/entities/Gym";
import { GymModel } from "../models/GymModel";

export class MongoGymRepository implements IGymRepository {
  async create(gym: Gym): Promise<Gym> {
    const newGym = await GymModel.create(gym);
    return newGym.toObject() as Gym;
  }

  async findById(id: string): Promise<Gym | null> {
    const gym = await GymModel.findById(id);
    return gym ? (gym.toObject() as Gym) : null;
  }

  async findByOwnerId(ownerId: string): Promise<Gym[]> {
    const gyms = await GymModel.find({ ownerId });
    return gyms.map((gym) => gym.toObject() as Gym);
  }

  async findAll(): Promise<Gym[]> {
    const gyms = await GymModel.find();
    return gyms.map((gym) => gym.toObject() as Gym);
  }

  async update(id: string, gym: Partial<Gym>): Promise<Gym | null> {
    const updatedGym = await GymModel.findByIdAndUpdate(
      id,
      { ...gym, updatedAt: new Date() },
      { new: true }
    );
    return updatedGym ? (updatedGym.toObject() as Gym) : null;
  }

  async delete(id: string): Promise<boolean> {
    const result = await GymModel.findByIdAndDelete(id);
    return !!result;
  }
}
