import { UserFactory } from "../factories/UserFactory";
import { GymFactory } from "../factories/GymFactory";
import { ClientFactory } from "../factories/ClientFactory";
import { MongoUserRepository } from "../repositories/MongoUserRepository";
import { MongoGymRepository } from "../repositories/MongoGymRepository";
import { MongoClientRepository } from "../repositories/MongoClientRepository";
import { AuthService } from "../services/AuthService";
import { UserRole } from "../../domain/entities/User";
import { ObjectId } from "mongoose";
import { SubscriptionFactory } from "../factories/SubscriptionFactory";
import { MongoSubscriptionRepository } from "../repositories/MongoSubscriptionRepository";
import { MembershipFactory } from "../factories/MembershipFactory";
import { MongoMembershipRepository } from "../repositories/MongoMembershipRepository";
import { UserModel } from "../models/UserModel";
import { GymModel } from "../models/GymModel";
import { ClientModel } from "../models/ClientModel";
import { SubscriptionModel } from "../models/SubscriptionModel";
import { MembershipModel } from "../models/MembershipModel";

export class DatabaseSeeder {
  private userFactory: UserFactory;
  private gymFactory: GymFactory;
  private clientFactory: ClientFactory;
  private subscriptionFactory: SubscriptionFactory;
  private membershipFactory: MembershipFactory;

  constructor() {
    const userRepository = new MongoUserRepository();
    const gymRepository = new MongoGymRepository();
    const clientRepository = new MongoClientRepository();
    const subscriptionRepository = new MongoSubscriptionRepository();
    const authService = new AuthService();
    const membershipRepository = new MongoMembershipRepository();

    this.userFactory = new UserFactory(userRepository, authService);
    this.gymFactory = new GymFactory(gymRepository);
    this.clientFactory = new ClientFactory(clientRepository);
    this.subscriptionFactory = new SubscriptionFactory(subscriptionRepository);
    this.membershipFactory = new MembershipFactory(membershipRepository);
  }

  private async clearCollections() {
    try {
      await Promise.all([
        UserModel.deleteMany({}),
        GymModel.deleteMany({}),
        ClientModel.deleteMany({}),
        SubscriptionModel.deleteMany({}),
        MembershipModel.deleteMany({}),
      ]);
      console.log("All collections cleared successfully");
    } catch (error) {
      console.error("Error clearing collections:", error);
      throw error;
    }
  }

  async seed() {
    try {
      // Limpiar todas las colecciones antes de sembrar
      await this.clearCollections();

      // Crear usuarios
      const owner = await this.userFactory.create({
        role: UserRole.OWNER,
        name: "Admin",
        email: "admin@test.com",
      });

      const gym = await this.gymFactory.create({
        user: owner._id as unknown as ObjectId,
        name: "Gym 1",
        address: "123 Main St",
        phone: "1234567890",
        email: "gym1@test.com",
      });

      const membership = await this.membershipFactory.create({
        name: "Mensual",
        price: 200,
        duration: 30,
        gym: gym._id as unknown as ObjectId,
      });

      const users = await this.clientFactory.createMany(150, {
        gym: gym._id as unknown as ObjectId,
      });

      for (let i = 0; i < 50; i++) {
        const user = users[i];
        await this.subscriptionFactory.create({
          client: user._id as unknown as ObjectId,
          gym: gym._id as unknown as ObjectId,
          membership: membership._id as unknown as ObjectId,
        });
      }

      console.log("Database seeding completed successfully");
    } catch (error) {
      console.error("Error seeding database:", error);
      throw error;
    }
  }
}
