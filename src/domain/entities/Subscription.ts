import { Schema } from "mongoose";

export enum SubscriptionStatus {
  ACTIVE = "active",
  EXPIRED = "expired",
  PAUSED = "paused",
  EXPIRES_SOON = "expires_soon",
  NOT_STARTED = "not_started",
}

export interface Subscription {
  _id?: Schema.Types.ObjectId;
  client: Schema.Types.ObjectId;
  membership: Schema.Types.ObjectId;
  gym: Schema.Types.ObjectId;
  status: SubscriptionStatus;
  startDate: Date;
  endDate: Date;
  price: number;
  paymentHistory: {
    date: Date;
    amount: number;
  }[];
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
  updatedBy: string;
}
