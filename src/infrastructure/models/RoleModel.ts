import mongoose, { Schema, Document } from "mongoose";
import { Role } from "../../domain/entities/Role";

export interface RoleDocument extends Omit<Role, "_id">, Document {}

const roleSchema = new Schema<RoleDocument>(
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
    permissions: [
      {
        type: Schema.Types.ObjectId,
        ref: "Permission",
      },
    ],
    isSystem: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export const RoleModel = mongoose.model<RoleDocument>("Role", roleSchema);
