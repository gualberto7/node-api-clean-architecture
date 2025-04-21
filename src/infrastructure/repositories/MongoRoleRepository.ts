import { Role } from "../../domain/entities/Role";
import { IRoleRepository } from "../../domain/repositories/IRoleRepository";
import { RoleModel, RoleDocument } from "../models/RoleModel";

export class MongoRoleRepository implements IRoleRepository {
  async create(role: Role): Promise<Role> {
    const newRole = new RoleModel(role);
    await newRole.save();
    return this.toRole(newRole);
  }

  async findById(id: string): Promise<Role | null> {
    const role = await RoleModel.findById(id).populate("permissions");
    return role ? this.toRole(role) : null;
  }

  async findAll(): Promise<Role[]> {
    const roles = await RoleModel.find().populate("permissions");
    return roles.map((role) => this.toRole(role));
  }

  async update(id: string, role: Role): Promise<Role | null> {
    const updatedRole = await RoleModel.findByIdAndUpdate(id, role, {
      new: true,
    }).populate("permissions");
    return updatedRole ? this.toRole(updatedRole) : null;
  }

  async delete(id: string): Promise<boolean> {
    const role = await RoleModel.findById(id);
    if (!role || role.isSystem) {
      return false; // No se puede eliminar un rol del sistema
    }
    const result = await RoleModel.findByIdAndDelete(id);
    return !!result;
  }

  async findByName(name: string): Promise<Role | null> {
    const role = await RoleModel.findOne({ name }).populate("permissions");
    return role ? this.toRole(role) : null;
  }

  async addPermission(
    roleId: string,
    permissionId: string
  ): Promise<Role | null> {
    const role = await RoleModel.findById(roleId);
    if (!role) {
      return null;
    }

    // Verificar si el permiso ya está asignado
    if (role.permissions.includes(permissionId as any)) {
      return this.toRole(role);
    }

    role.permissions.push(permissionId as any);
    await role.save();

    const updatedRole = await RoleModel.findById(roleId).populate(
      "permissions"
    );
    return updatedRole ? this.toRole(updatedRole) : null;
  }

  async removePermission(
    roleId: string,
    permissionId: string
  ): Promise<Role | null> {
    const role = await RoleModel.findById(roleId);
    if (!role) {
      return null;
    }

    // Verificar si el permiso está asignado
    if (!role.permissions.includes(permissionId as any)) {
      return this.toRole(role);
    }

    role.permissions = role.permissions.filter(
      (id) => id.toString() !== permissionId
    );
    await role.save();

    const updatedRole = await RoleModel.findById(roleId).populate(
      "permissions"
    );
    return updatedRole ? this.toRole(updatedRole) : null;
  }

  private toRole(document: RoleDocument): Role {
    return {
      _id: document._id ? document._id.toString() : undefined,
      name: document.name,
      description: document.description,
      permissions: document.permissions.map((p: any) => p.toString()),
      isSystem: document.isSystem,
      createdAt: document.createdAt,
      updatedAt: document.updatedAt,
    };
  }
}
