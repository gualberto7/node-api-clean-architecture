import { Schema } from "mongoose";

export interface Client {
  _id?: string;
  ci: string;
  name: string;
  email: string;
  phone: string;
  gym: Schema.Types.ObjectId;
  birthDate?: Date;
  gender?: string;
  address?: string;
  emergencyContact?: {
    name: string;
    phone: string;
    relationship: string;
  };
  createdAt: Date;
  updatedAt: Date;
}
