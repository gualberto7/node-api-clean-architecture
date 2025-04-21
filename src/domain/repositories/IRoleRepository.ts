import { Role } from "../entities/Role";

export interface IRoleRepository {
  create(role: Role): Promise<Role>;
  findById(id: string): Promise<Role | null>;
  findAll(): Promise<Role[]>;
  update(id: string, role: Role): Promise<Role | null>;
  delete(id: string): Promise<boolean>;
  findByName(name: string): Promise<Role | null>;
  addPermission(roleId: string, permissionId: string): Promise<Role | null>;
  removePermission(roleId: string, permissionId: string): Promise<Role | null>;
}
