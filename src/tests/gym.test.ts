import request from "supertest";
import { app } from "../index";
import { UserRole } from "../domain/entities/User";
import { ObjectId } from "mongoose";

describe("Gym API", () => {
  describe("GET /api/gyms", () => {
    it("should return all gyms for authenticated user", async () => {
      // Crear datos específicos para este test
      const owner = await global.testBase.userFactory.create({
        role: UserRole.OWNER,
        name: "Admin",
      });

      await global.testBase.gymFactory.create({
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
        .get("/api/gyms")
        .set("Authorization", `Bearer ${global.testBase.authToken}`);

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
