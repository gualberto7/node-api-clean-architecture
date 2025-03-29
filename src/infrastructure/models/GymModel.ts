import mongoose, { Document } from "mongoose";
import { Gym } from "../../domain/entities/Gym";

export interface GymDocument extends Omit<Gym, "_id">, Document {}

const gymSchema = new mongoose.Schema<GymDocument>(
  {
    name: { type: String, required: true },
    address: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    ownerId: { type: String, required: true },
    memberships: [{ type: String }],
    clients: [{ type: String }],
    staff: [{ type: String }],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  }
);

export const GymModel = mongoose.model<GymDocument>("Gym", gymSchema);
