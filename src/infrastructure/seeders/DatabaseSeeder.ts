import { UserFactory } from "../factories/UserFactory";
import { GymFactory } from "../factories/GymFactory";
import { ClientFactory } from "../factories/ClientFactory";
import { MongoUserRepository } from "../repositories/MongoUserRepository";
import { MongoGymRepository } from "../repositories/MongoGymRepository";
import { MongoClientRepository } from "../repositories/MongoClientRepository";
import { AuthService } from "../services/AuthService";

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
      const users = await this.userFactory.createMany(3);
      console.log("Users created:", users.length);

      // Crear gimnasios para cada usuario
      for (const user of users) {
        const gyms = await this.gymFactory.createMany(2, {
          ownerId: user._id,
        });
        console.log(`Gyms created for user ${user._id}:`, gyms.length);

        // Crear clientes para cada gimnasio
        for (const gym of gyms) {
          const clients = await this.clientFactory.createMany(5, {
            gymId: gym._id,
          });
          console.log(`Clients created for gym ${gym._id}:`, clients.length);
        }
      }

      console.log("Database seeding completed successfully");
    } catch (error) {
      console.error("Error seeding database:", error);
      throw error;
    }
  }
}
