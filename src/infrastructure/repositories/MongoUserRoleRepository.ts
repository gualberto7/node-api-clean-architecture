import { UserRole } from "../../domain/entities/UserRole";
import { IUserRoleRepository } from "../../domain/repositories/IUserRoleRepository";
import { UserRoleModel, UserRoleDocument } from "../models/UserRoleModel";

export class MongoUserRoleRepository implements IUserRoleRepository {
  async create(userRole: UserRole): Promise<UserRole> {
    const newUserRole = new UserRoleModel({
      userId: userRole.userId,
      roleId: userRole.roleId,
      gymId: userRole.gymId,
      createdAt: userRole.createdAt,
      updatedAt: userRole.updatedAt,
    });
    await newUserRole.save();
    return this.toUserRole(newUserRole);
  }

  async findById(id: string): Promise<UserRole | null> {
    const userRole = await UserRoleModel.findById(id).populate("roleId");
    return userRole ? this.toUserRole(userRole) : null;
  }

  async findAll(): Promise<UserRole[]> {
    const userRoles = await UserRoleModel.find().populate("roleId");
    return userRoles.map((userRole) => this.toUserRole(userRole));
  }

  async findByUserId(userId: string): Promise<UserRole[]> {
    const userRoles = await UserRoleModel.find({ userId }).populate("roleId");
    return userRoles.map((userRole) => this.toUserRole(userRole));
  }

  async findByRoleId(roleId: string): Promise<UserRole[]> {
    const userRoles = await UserRoleModel.find({ roleId }).populate("roleId");
    return userRoles.map((userRole) => this.toUserRole(userRole));
  }

  async findByGymId(gymId: string): Promise<UserRole[]> {
    const userRoles = await UserRoleModel.find({ gymId }).populate("roleId");
    return userRoles.map((userRole) => this.toUserRole(userRole));
  }

  async delete(id: string): Promise<boolean> {
    const result = await UserRoleModel.findByIdAndDelete(id);
    return !!result;
  }

  async deleteByUserIdAndRoleId(
    userId: string,
    roleId: string
  ): Promise<boolean> {
    const result = await UserRoleModel.findOneAndDelete({ userId, roleId });
    return !!result;
  }

  async deleteByUserIdAndRoleIdAndGymId(
    userId: string,
    roleId: string,
    gymId: string
  ): Promise<boolean> {
    const result = await UserRoleModel.findOneAndDelete({
      userId,
      roleId,
      gymId,
    });
    return !!result;
  }

  private toUserRole(document: UserRoleDocument): UserRole {
    return new UserRole(
      document.userId.toString(),
      document.roleId.toString(),
      document.gymId?.toString(),
      document.createdAt,
      document.updatedAt,
      document._id?.toString()
    );
  }
}
