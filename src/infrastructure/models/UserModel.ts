import mongoose, { Schema, Document } from "mongoose";
import { User } from "../../domain/entities/User";

export interface UserDocument extends Omit<User, "id">, Document {}

const userSchema = new Schema<UserDocument>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    role: {
      type: String,
      enum: ["user", "admin", "owner"],
      default: "user",
    },
  },
  {
    timestamps: true,
  }
);

export const UserModel = mongoose.model<UserDocument>("User", userSchema);
