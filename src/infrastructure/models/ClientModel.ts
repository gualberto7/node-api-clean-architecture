import mongoose, { Document, Schema } from "mongoose";
import { Client } from "../../domain/entities/Client";

export interface ClientDocument extends Omit<Client, "_id">, Document {}

const clientSchema = new mongoose.Schema<ClientDocument>(
  {
    ci: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    gym: { type: Schema.Types.ObjectId, ref: "Gym" },
    birthDate: { type: Date },
    gender: { type: String },
    address: { type: String },
    emergencyContact: {
      name: String,
      phone: String,
      relationship: String,
    },
  },
  {
    timestamps: true,
  }
);

export const ClientModel = mongoose.model<ClientDocument>(
  "Client",
  clientSchema
);
