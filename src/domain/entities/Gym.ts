import { Schema } from "mongoose";

export interface Gym {
  _id?: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  user: Schema.Types.ObjectId;
  memberships: Schema.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}
