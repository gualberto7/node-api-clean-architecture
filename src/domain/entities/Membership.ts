import { Schema } from "mongoose";

export interface Membership {
  _id?: string;
  gym: Schema.Types.ObjectId;
  name: string;
  price: number;
  duration: number;
  status: boolean;
  isPromo: boolean;
  maxEntries?: number;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
  updatedBy: string;
}
