import mongoose, { Document } from "mongoose";
import { Client } from "../../domain/entities/Client";

export interface ClientDocument extends Omit<Client, "id">, Document {}

const clientSchema = new mongoose.Schema<ClientDocument>(
  {
    ci: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    gymId: { type: String, required: true },
    subscriptionId: { type: String },
    birthDate: { type: Date },
    gender: { type: String },
    address: { type: String },
    emergencyContact: {
      name: String,
      phone: String,
      relationship: String,
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  }
);

export const ClientModel = mongoose.model<ClientDocument>(
  "Client",
  clientSchema
);
