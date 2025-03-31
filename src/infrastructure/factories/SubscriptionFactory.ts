import { ObjectId } from "mongoose";
import { faker } from "@faker-js/faker";
import { Subscription } from "../../domain/entities/Subscription";
import { MongoSubscriptionRepository } from "../repositories/MongoSubscriptionRepository";

export class SubscriptionFactory {
  constructor(private subscriptionRepository: MongoSubscriptionRepository) {}

  async create(data: Partial<Subscription> = {}): Promise<Subscription> {
    const defaultSubscription: Partial<Subscription> = {
      client: data.client as ObjectId,
      membership: data.membership as ObjectId,
      gym: data.gym as ObjectId,
      startDate: faker.date.past(),
      endDate: faker.date.future(),
      price: data.price || faker.number.int({ min: 100, max: 1000 }),
      paymentHistory: [],
      createdBy: "Seeder",
      updatedBy: "Seeder",
    };

    const subscriptionData = { ...defaultSubscription, ...data };
    return this.subscriptionRepository.create(subscriptionData as Subscription);
  }

  async createMany(
    count: number,
    data: Partial<Subscription> = {}
  ): Promise<Subscription[]> {
    const subscriptions: Subscription[] = [];
    for (let i = 0; i < count; i++) {
      subscriptions.push(await this.create(data));
    }
    return subscriptions;
  }
}
