import mongoose, { Schema, Document } from "mongoose";
import { Permission } from "../../domain/entities/Permission";

export interface PermissionDocument extends Omit<Permission, "_id">, Document {}

const permissionSchema = new Schema<PermissionDocument>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    code: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

export const PermissionModel = mongoose.model<PermissionDocument>(
  "Permission",
  permissionSchema
);
