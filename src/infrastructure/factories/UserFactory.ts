import { User, UserRole } from "../../domain/entities/User";
import { MongoUserRepository } from "../repositories/MongoUserRepository";
import { AuthService } from "../services/AuthService";
import { faker } from "@faker-js/faker";

export class UserFactory {
  constructor(
    private userRepository: MongoUserRepository,
    private authService: AuthService
  ) {}

  async create(data: Partial<User> = {}): Promise<User> {
    const defaultUser: Partial<User> = {
      email: faker.internet.email(),
      password: await this.authService.hashPassword("password"),
      name: faker.person.firstName(),
      lastName: faker.person.lastName(),
      role: UserRole.ADMIN,
    };

    const userData = { ...defaultUser, ...data };
    return this.userRepository.create(userData as User);
  }

  async createMany(count: number, data: Partial<User> = {}): Promise<User[]> {
    const users: User[] = [];
    for (let i = 0; i < count; i++) {
      users.push(await this.create(data));
    }
    return users;
  }
}
