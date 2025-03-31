import mongoose, { Document, Schema } from "mongoose";
import { Membership } from "../../domain/entities/Membership";

export interface MembershipDocument extends Omit<Membership, "_id">, Document {}

const membershipSchema = new mongoose.Schema<MembershipDocument>(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    duration: { type: Number, required: true },
    status: { type: Boolean, default: false },
    isPromo: { type: Boolean, default: false },
    maxEntries: { type: Number },
    description: { type: String },
    createdBy: { type: String, required: true },
    updatedBy: { type: String, required: true },
    gym: { type: Schema.Types.ObjectId, ref: "Gym" },
  },
  {
    timestamps: true,
  }
);

export const MembershipModel = mongoose.model<MembershipDocument>(
  "Membership",
  membershipSchema
);
