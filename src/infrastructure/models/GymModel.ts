import mongoose, { Document, Schema } from "mongoose";
import { Gym } from "../../domain/entities/Gym";

export interface GymDocument extends Omit<Gym, "_id">, Document {}

const gymSchema = new mongoose.Schema<GymDocument>(
  {
    name: { type: String, required: true },
    address: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    memberships: [{ type: Schema.Types.ObjectId, ref: "Membership" }],
  },
  { timestamps: true }
);

export const GymModel = mongoose.model<GymDocument>("Gym", gymSchema);
