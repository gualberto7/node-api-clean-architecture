export enum SubscriptionStatus {
  ACTIVE = "active",
  EXPIRED = "expired",
  CANCELLED = "cancelled",
  PENDING = "pending",
}

export class Subscription {
  constructor(
    public id: string,
    public clientId: string,
    public membershipId: string,
    public gymId: string,
    public status: SubscriptionStatus,
    public startDate: Date,
    public endDate: Date,
    public price: number,
    public paymentHistory: {
      date: Date;
      amount: number;
      status: "paid" | "pending" | "failed";
    }[] = [],
    public createdAt: Date = new Date(),
    public updatedAt: Date = new Date(),
    public createdBy: string,
    public updatedBy: string
  ) {}
}
