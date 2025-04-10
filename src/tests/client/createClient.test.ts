import request from "supertest";
import { app } from "../../index";
import { UserRole } from "../../domain/entities/User";
import { ObjectId } from "mongoose";

describe("Client API", () => {
  describe("POST /api/clients", () => {
    it("should create a new client", async () => {
      const owner = await global.testBase.userFactory.create({
        role: UserRole.OWNER,
        name: "Admin",
      });

      const gym = await global.testBase.gymFactory.create({
        name: "Test Gym",
        user: owner._id as unknown as ObjectId,
      });

      global.testBase.authToken = global.testBase.authService.generateToken(
        owner._id as string,
        owner.name,
        owner.email
      );

      const response = await request(app)
        .post(`/api/gym/${gym._id}/clients`)
        .set("Authorization", `Bearer ${global.testBase.authToken}`)
        .send({
          ci: "1234567890",
          name: "John Doe",
          email: "john.doe@example.com",
          phone: "+1234567890",
          address: "123 Main St, Anytown, USA",
        });

      expect(response.status).toBe(201);
      expect(response.body._id).toBeDefined();
      expect(response.body.ci).toBe("1234567890");
      expect(response.body.name).toBe("John Doe");
      expect(response.body.email).toBe("john.doe@example.com");
      expect(response.body.phone).toBe("+1234567890");
      expect(response.body.address).toBe("123 Main St, Anytown, USA");
    });
  });
});
