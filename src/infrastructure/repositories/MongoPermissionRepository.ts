import { Permission } from "../../domain/entities/Permission";
import { IPermissionRepository } from "../../domain/repositories/IPermissionRepository";
import { PermissionModel, PermissionDocument } from "../models/PermissionModel";

export class MongoPermissionRepository implements IPermissionRepository {
  async create(permission: Permission): Promise<Permission> {
    const newPermission = new PermissionModel(permission);
    await newPermission.save();
    return this.toPermission(newPermission);
  }

  async findById(id: string): Promise<Permission | null> {
    const permission = await PermissionModel.findById(id);
    return permission ? this.toPermission(permission) : null;
  }

  async findAll(): Promise<Permission[]> {
    const permissions = await PermissionModel.find();
    return permissions.map((permission) => this.toPermission(permission));
  }

  async update(id: string, permission: Permission): Promise<Permission | null> {
    const updatedPermission = await PermissionModel.findByIdAndUpdate(
      id,
      permission,
      { new: true }
    );
    return updatedPermission ? this.toPermission(updatedPermission) : null;
  }

  async delete(id: string): Promise<boolean> {
    const result = await PermissionModel.findByIdAndDelete(id);
    return !!result;
  }

  async findByCode(code: string): Promise<Permission | null> {
    const permission = await PermissionModel.findOne({ code });
    return permission ? this.toPermission(permission) : null;
  }

  private toPermission(document: PermissionDocument): Permission {
    return {
      _id: document._id ? document._id.toString() : undefined,
      name: document.name,
      description: document.description,
      code: document.code,
      createdAt: document.createdAt,
      updatedAt: document.updatedAt,
    };
  }
}
