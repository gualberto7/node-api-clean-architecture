import { User } from "../../../domain/entities/User";
import { IUserRepository } from "../../../domain/repositories/IUserRepository";

export class CreateUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(
    userData: Omit<User, "id" | "createdAt" | "updatedAt">
  ): Promise<User> {
    // Verificar si el usuario ya existe
    const existingUser = await this.userRepository.findByEmail(userData.email);
    if (existingUser) {
      throw new Error("User already exists");
    }

    // Crear el usuario
    const user = await this.userRepository.create(userData);
    return user;
  }
}
