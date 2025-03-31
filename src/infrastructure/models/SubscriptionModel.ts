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
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Virtual property for subscription status
subscriptionSchema.virtual("status").get(function () {
  const today = new Date();
  const startDate = this.startDate;
  const endDate = this.endDate;
  const threeDaysFromNow = new Date(today.getTime() + 3 * 24 * 60 * 60 * 1000);

  // Reset hours to compare only dates
  today.setHours(0, 0, 0, 0);
  startDate.setHours(0, 0, 0, 0);
  endDate.setHours(0, 0, 0, 0);
  threeDaysFromNow.setHours(0, 0, 0, 0);

  if (startDate > today) {
    return "not_started";
  } else if (endDate < today) {
    return "expired";
  } else if (endDate.getTime() === today.getTime()) {
    return "expires_today";
  } else if (endDate <= threeDaysFromNow) {
    return "expires_soon";
  } else {
    return "active";
  }
});

export const SubscriptionModel = mongoose.model<SubscriptionDocument>(
  "Subscription",
  subscriptionSchema
);
