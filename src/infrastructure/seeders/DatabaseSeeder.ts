import { UserFactory } from "../factories/UserFactory";
import { GymFactory } from "../factories/GymFactory";
import { ClientFactory } from "../factories/ClientFactory";
import { MongoUserRepository } from "../repositories/MongoUserRepository";
import { MongoGymRepository } from "../repositories/MongoGymRepository";
import { MongoClientRepository } from "../repositories/MongoClientRepository";
import { AuthService } from "../services/AuthService";
import { UserRole } from "../../domain/entities/User";

export class DatabaseSeeder {
  private userFactory: UserFactory;
  private gymFactory: GymFactory;
  private clientFactory: ClientFactory;

  constructor() {
    const userRepository = new MongoUserRepository();
    const gymRepository = new MongoGymRepository();
    const clientRepository = new MongoClientRepository();
    const authService = new AuthService();

    this.userFactory = new UserFactory(userRepository, authService);
    this.gymFactory = new GymFactory(gymRepository);
    this.clientFactory = new ClientFactory(clientRepository);
  }

  async seed() {
    try {
      // Crear usuarios
      const owner = await this.userFactory.create({
        role: UserRole.OWNER,
        name: "Admin",
        email: "admin@test.com",
      });

      const gym = await this.gymFactory.create({
        ownerId: owner._id,
        name: "Gym 1",
        address: "123 Main St",
        phone: "1234567890",
        email: "gym1@test.com",
      });

      await this.clientFactory.createMany(150, {
        gymId: gym._id,
      });

      console.log("Database seeding completed successfully");
    } catch (error) {
      console.error("Error seeding database:", error);
      throw error;
    }
  }
}
