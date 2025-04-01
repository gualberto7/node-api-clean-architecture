import mongoose, { Document, Schema } from "mongoose";
import { Entry } from "../../domain/entities/Entry";

export interface EntryDocument extends Omit<Entry, "_id">, Document {}

const entrySchema = new mongoose.Schema<EntryDocument>(
  {
    client: { type: Schema.Types.ObjectId, ref: "Client", required: true },
    gym: { type: Schema.Types.ObjectId, ref: "Gym", required: true },
    subscription: {
      type: Schema.Types.ObjectId,
      ref: "Subscription",
      required: true,
    },
    createdBy: { type: String, required: true },
    updatedBy: { type: String, required: true },
  },
  { timestamps: true }
);

export const EntryModel = mongoose.model<EntryDocument>("Entry", entrySchema);
