import { MongoUserRepository } from "../infrastructure/repositories/MongoUserRepository";
import { MongoGymRepository } from "../infrastructure/repositories/MongoGymRepository";
import { AuthService } from "../infrastructure/services/AuthService";
import { UserFactory } from "../infrastructure/factories/UserFactory";
import { GymFactory } from "../infrastructure/factories/GymFactory";

declare global {
  var testBase: {
    authToken: string;
    userRepository: MongoUserRepository;
    gymRepository: MongoGymRepository;
    authService: AuthService;
    userFactory: UserFactory;
    gymFactory: GymFactory;
  };
}
