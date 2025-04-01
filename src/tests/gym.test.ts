import request from "supertest";
import { app } from "../index";
import { connectDB } from "../infrastructure/config/database";
import { DatabaseSeeder } from "../infrastructure/seeders/DatabaseSeeder";
import { MongoUserRepository } from "../infrastructure/repositories/MongoUserRepository";
import { AuthService } from "../infrastructure/services/AuthService";

describe("Gym API", () => {
  let authToken: string;

  beforeAll(async () => {
    // Conectar a la base de datos de test
    await connectDB();

    // Limpiar y sembrar datos de prueba
    const seeder = new DatabaseSeeder();
    await seeder.seed();

    // Obtener token de autenticación
    const userRepository = new MongoUserRepository();
    const authService = new AuthService();
    const owner = await userRepository.findByEmail("admin@test.com");

    if (owner) {
      authToken = authService.generateToken(
        owner._id as string,
        owner.name,
        owner.email
      );
    }
  });

  describe("GET /api/gyms", () => {
    it("should return all gyms for authenticated user", async () => {
      const response = await request(app)
        .get("/api/gyms")
        .set("Authorization", `Bearer ${authToken}`);
      console.log(response.body);
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
