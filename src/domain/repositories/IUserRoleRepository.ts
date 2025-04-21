import { UserRole } from "../entities/UserRole";

export interface IUserRoleRepository {
  create(userRole: UserRole): Promise<UserRole>;
  findById(id: string): Promise<UserRole | null>;
  findByUserId(userId: string): Promise<UserRole[]>;
  findByRoleId(roleId: string): Promise<UserRole[]>;
  findByGymId(gymId: string): Promise<UserRole[]>;
  delete(id: string): Promise<boolean>;
  deleteByUserIdAndRoleId(userId: string, roleId: string): Promise<boolean>;
  deleteByUserIdAndRoleIdAndGymId(
    userId: string,
    roleId: string,
    gymId: string
  ): Promise<boolean>;
}
