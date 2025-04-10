import dotenv from "dotenv";
import { connectDB, disconnectDB } from "../infrastructure/config/database";
import { MongoUserRepository } from "../infrastructure/repositories/MongoUserRepository";
import { MongoGymRepository } from "../infrastructure/repositories/MongoGymRepository";
import { AuthService } from "../infrastructure/services/AuthService";
import { UserModel } from "../infrastructure/models/UserModel";
import { GymModel } from "../infrastructure/models/GymModel";
import { ClientModel } from "../infrastructure/models/ClientModel";
import { UserFactory } from "../infrastructure/factories/UserFactory";
import { GymFactory } from "../infrastructure/factories/GymFactory";

// Cargar variables de entorno de test
dotenv.config({ path: ".env.test" });

// Inicializar variables globales
global.testBase = {
  authToken: "",
  userRepository: new MongoUserRepository(),
  gymRepository: new MongoGymRepository(),
  authService: new AuthService(),
  userFactory: new UserFactory(new MongoUserRepository(), new AuthService()),
  gymFactory: new GymFactory(new MongoGymRepository()),
};

// Conectar a la base de datos una sola vez antes de todos los tests
beforeAll(async () => {
  await connectDB();
});

// Limpiar la base de datos antes de cada test
beforeEach(async () => {
  await Promise.all([
    UserModel.deleteMany({}),
    GymModel.deleteMany({}),
    ClientModel.deleteMany({}),
  ]);
});

afterAll(async () => {
  await disconnectDB();
});
