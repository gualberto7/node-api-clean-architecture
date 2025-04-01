import { Schema } from "mongoose";

export interface Entry {
  _id: string;
  client: Schema.Types.ObjectId;
  gym: Schema.Types.ObjectId;
  subscription: Schema.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
  updatedBy: string;
}
