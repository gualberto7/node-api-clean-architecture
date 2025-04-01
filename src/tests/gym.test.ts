import request from "supertest";
import { app } from "../index";
import { connectDB } from "../infrastructure/config/database";
import { MongoUserRepository } from "../infrastructure/repositories/MongoUserRepository";
import { MongoGymRepository } from "../infrastructure/repositories/MongoGymRepository";
import { AuthService } from "../infrastructure/services/AuthService";
import { UserRole } from "../domain/entities/User";
import { UserModel } from "../infrastructure/models/UserModel";
import { GymModel } from "../infrastructure/models/GymModel";
import { Gym } from "../domain/entities/Gym";
import { ObjectId } from "mongoose";
import { UserFactory } from "../infrastructure/factories/UserFactory";

describe("Gym API", () => {
  let authToken: string;
  let userRepository: MongoUserRepository;
  let gymRepository: MongoGymRepository;
  let authService: AuthService;
  let userFactory: UserFactory;

  beforeAll(async () => {
    // Conectar a la base de datos de test
    await connectDB();

    // Inicializar repositorios y servicios
    userRepository = new MongoUserRepository();
    gymRepository = new MongoGymRepository();
    authService = new AuthService();
    userFactory = new UserFactory(userRepository, authService);
  });

  beforeEach(async () => {
    // Limpiar la base de datos antes de cada test
    await Promise.all([UserModel.deleteMany({}), GymModel.deleteMany({})]);
  });

  describe("GET /api/gyms", () => {
    it("should return all gyms for authenticated user", async () => {
      // Crear datos específicos para este test
      const owner = await userFactory.create({
        role: UserRole.OWNER,
        name: "Admin",
        email: "admin@test.com",
      });

      const gym: Gym = {
        name: "Test Gym",
        address: "Test Address",
        phone: "1234567890",
        email: "gym@test.com",
        user: owner._id as unknown as ObjectId,
        memberships: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      await gymRepository.create(gym);

      // Generar token para el owner
      authToken = authService.generateToken(
        owner._id as string,
        owner.name,
        owner.email
      );

      const response = await request(app)
        .get("/api/gyms")
        .set("Authorization", `Bearer ${authToken}`);

      expect(response.status).toBe(200);
      expect(response.body.data.length).toBeGreaterThan(0);
      expect(response.body.data[0]).toHaveProperty("_id");
      expect(response.body.data[0]).toHaveProperty("name");
      expect(response.body.data[0]).toHaveProperty("address");
      expect(response.body.data[0]).toHaveProperty("phone");
      expect(response.body.data[0]).toHaveProperty("email");
    });

    it("should return 401 for unauthenticated requests", async () => {
      const response = await request(app).get("/api/gyms");

      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty("message", "No token provided");
    });

    it("should return 401 for invalid token", async () => {
      const response = await request(app)
        .get("/api/gyms")
        .set("Authorization", "Bearer invalid-token");

      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty("message", "Invalid token");
    });
  });
});
