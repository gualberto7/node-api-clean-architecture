import mongoose, { Schema, Document } from "mongoose";
import { UserRole } from "../../domain/entities/UserRole";

export interface UserRoleDocument extends Omit<UserRole, "_id">, Document {}

const userRoleSchema = new Schema<UserRoleDocument>(
  {
    userId: {
      type: String,
      ref: "User",
      required: true,
    },
    roleId: {
      type: String,
      ref: "Role",
      required: true,
    },
    gymId: {
      type: String,
      ref: "Gym",
    },
  },
  {
    timestamps: true,
  }
);

// Índice compuesto para evitar duplicados
userRoleSchema.index({ userId: 1, roleId: 1, gymId: 1 }, { unique: true });

export const UserRoleModel = mongoose.model<UserRoleDocument>(
  "UserRole",
  userRoleSchema
);
