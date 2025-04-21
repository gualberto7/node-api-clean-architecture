import { Permission } from "../entities/Permission";

export interface IPermissionRepository {
  create(permission: Permission): Promise<Permission>;
  findById(id: string): Promise<Permission | null>;
  findAll(): Promise<Permission[]>;
  update(id: string, permission: Permission): Promise<Permission | null>;
  delete(id: string): Promise<boolean>;
  findByCode(code: string): Promise<Permission | null>;
}
