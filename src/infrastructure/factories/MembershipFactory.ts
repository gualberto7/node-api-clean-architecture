import { faker } from "@faker-js/faker";
import { Membership } from "../../domain/entities/Membership";
import { MongoMembershipRepository } from "../repositories/MongoMembershipRepository";
import { ObjectId } from "mongoose";

export class MembershipFactory {
  constructor(private membershipRepository: MongoMembershipRepository) {}

  async create(data: Partial<Membership> = {}): Promise<Membership> {
    const defaultMembership: Partial<Membership> = {
      name: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      price: faker.number.int({ min: 100, max: 1000 }),
      duration: faker.number.int({ min: 15, max: 365 }),
      gym: data.gym as ObjectId,
      createdBy: "Seeder",
      updatedBy: "Seeder",
    };

    const membershipData = { ...defaultMembership, ...data };
    return this.membershipRepository.create(membershipData as Membership);
  }

  async createMany(
    count: number,
    data: Partial<Membership> = {}
  ): Promise<Membership[]> {
    const memberships: Membership[] = [];
    for (let i = 0; i < count; i++) {
      memberships.push(await this.create(data));
    }
    return memberships;
  }
}
