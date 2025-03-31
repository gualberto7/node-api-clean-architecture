import mongoose, { Document, Schema } from "mongoose";
import { Subscription } from "../../domain/entities/Subscription";

export interface SubscriptionDocument
  extends Omit<Subscription, "_id">,
    Document {}

const subscriptionSchema = new mongoose.Schema<SubscriptionDocument>(
  {
    client: { type: Schema.Types.ObjectId, ref: "Client" },
    membership: { type: Schema.Types.ObjectId, ref: "Membership" },
    gym: { type: Schema.Types.ObjectId, ref: "Gym" },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    price: { type: Number, required: true },
    paymentHistory: [{ type: Array<{ date: Date; amount: number }> }],
    createdBy: { type: String, required: true },
    updatedBy: { type: String, required: true },
  },
  { timestamps: true }
);

export const SubscriptionModel = mongoose.model<SubscriptionDocument>(
  "Subscription",
  subscriptionSchema
);
