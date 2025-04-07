import { connectDB } from "../infrastructure/config/database";
import { MongoUserRepository } from "../infrastructure/repositories/MongoUserRepository";
import { MongoGymRepository } from "../infrastructure/repositories/MongoGymRepository";
import { AuthService } from "../infrastructure/services/AuthService";
import { UserModel } from "../infrastructure/models/UserModel";
import { GymModel } from "../infrastructure/models/GymModel";
import { UserFactory } from "../infrastructure/factories/UserFactory";
import { GymFactory } from "../infrastructure/factories/GymFactory";
import { ClientModel } from "../infrastructure/models/ClientModel";

export class TestBase {
  public authToken: string = "";
  public userRepository!: MongoUserRepository;
  public gymRepository!: MongoGymRepository;
  public authService!: AuthService;
  public userFactory!: UserFactory;
  public gymFactory!: GymFactory;

  public async setup() {
    // Conectar a la base de datos de test
    await connectDB();

    // Inicializar repositorios y servicios
    this.userRepository = new MongoUserRepository();
    this.gymRepository = new MongoGymRepository();
    this.authService = new AuthService();
    this.userFactory = new UserFactory(this.userRepository, this.authService);
    this.gymFactory = new GymFactory(this.gymRepository);
  }

  public async cleanup() {
    // Limpiar la base de datos antes de cada test
    await Promise.all([
      UserModel.deleteMany({}),
      GymModel.deleteMany({}),
      ClientModel.deleteMany({}),
    ]);
  }
}
