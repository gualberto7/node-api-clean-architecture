import request from "supertest";
import { app } from "../../index";
import { UserRole } from "../../domain/entities/User";
import { ObjectId } from "mongoose";
import { TestBase } from "../testBase";

describe("Client API", () => {
  const testBase = new TestBase();

  beforeAll(async () => {
    await testBase.setup();
  });

  beforeEach(async () => {
    await testBase.cleanup();
  });

  describe("GET /api/clients", () => {
    it("should return all clients for authenticated owner", async () => {
      // Crear datos específicos para este test
      const owner = await testBase.userFactory.create({
        role: UserRole.OWNER,
        name: "Admin",
      });

      const gym = await testBase.gymFactory.create({
        name: "Test Gym",
        user: owner._id as unknown as ObjectId,
      });

      // Generar token para el owner
      testBase.authToken = testBase.authService.generateToken(
        owner._id as string,
        owner.name,
        owner.email
      );

      const response = await request(app)
        .get(`/api/gym/${gym._id}/clients`)
        .set("Authorization", `Bearer ${testBase.authToken}`);

      expect(response.status).toBe(200);
      expect(response.body.data).toBeDefined();
      expect(Array.isArray(response.body.data)).toBe(true);
    });

    it("should return 401 for unauthenticated requests", async () => {
      const response = await request(app).get("/api/clients");

      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty("message", "No token provided");
    });

    it("should return 401 for invalid token", async () => {
      const response = await request(app)
        .get("/api/clients")
        .set("Authorization", "Bearer invalid-token");

      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty("message", "Invalid token");
    });
  });
});
