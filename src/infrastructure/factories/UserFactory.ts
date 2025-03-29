import { User, UserRole } from "../../domain/entities/User";
import { MongoUserRepository } from "../repositories/MongoUserRepository";
import { AuthService } from "../services/AuthService";

export class UserFactory {
  constructor(
    private userRepository: MongoUserRepository,
    private authService: AuthService
  ) {}

  async create(data: Partial<User> = {}): Promise<User> {
    const defaultUser: Partial<User> = {
      email: `user${Math.random().toString(36).substring(7)}@test.com`,
      password: await this.authService.hashPassword("password"),
      name: "John",
      lastName: "Doe",
      role: UserRole.ADMIN,
      gyms: [],
      createdAt: new Date(),
      updatedAt: new Date(),
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
