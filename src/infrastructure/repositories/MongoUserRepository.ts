import { User } from "../../domain/entities/User";
import { IUserRepository } from "../../domain/repositories/IUserRepository";
import { UserModel } from "../models/UserModel";

export class MongoUserRepository implements IUserRepository {
  async create(user: User): Promise<User> {
    const newUser = await UserModel.create(user);
    return newUser.toObject() as User;
  }

  async findById(id: string): Promise<User | null> {
    const user = await UserModel.findById(id);
    return user?.toObject() as User | null;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await UserModel.findOne({ email });
    return user?.toObject() as User | null;
  }

  async findAll(): Promise<User[]> {
    const users = await UserModel.find();
    return users.map((user) => user.toObject() as User);
  }

  async update(id: string, user: Partial<User>): Promise<User | null> {
    const updatedUser = await UserModel.findByIdAndUpdate(
      id,
      { ...user, updatedAt: new Date() },
      { new: true }
    );
    return updatedUser?.toObject() as User | null;
  }

  async delete(id: string): Promise<boolean> {
    const result = await UserModel.findByIdAndDelete(id);
    return !!result;
  }
}
