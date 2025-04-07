import request from "supertest";
import { app } from "../../index";
import { UserRole } from "../../domain/entities/User";
import { ObjectId } from "mongoose";

describe("Client API", () => {
  describe("GET /api/clients", () => {
    it("should return all clients for authenticated owner", async () => {
      // Crear datos específicos para este test
      const owner = await global.testBase.userFactory.create({
        role: UserRole.OWNER,
        name: "Admin",
      });

      const gym = await global.testBase.gymFactory.create({
        name: "Test Gym",
        user: owner._id as unknown as ObjectId,
      });

      // Generar token para el owner
      global.testBase.authToken = global.testBase.authService.generateToken(
        owner._id as string,
        owner.name,
        owner.email
      );

      const response = await request(app)
        .get(`/api/gym/${gym._id}/clients`)
        .set("Authorization", `Bearer ${global.testBase.authToken}`);

      expect(response.status).toBe(200);
      expect(response.body.data).toBeDefined();
      expect(Array.isArray(response.body.data)).toBe(true);
    });

    it("should return 401 for unauthenticated requests", async () => {
      const response = await request(app).get(`/api/gym/45635435/clients`);

      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty("message", "No token provided");
    });

    it("should return 401 for invalid token", async () => {
      const response = await request(app)
        .get(`/api/gym/45635435/clients`)
        .set("Authorization", "Bearer invalid-token");

      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty("message", "Invalid token");
    });
  });
});
