import { User } from "../../../domain/entities/User";
import { IUserRepository } from "../../../domain/repositories/IUserRepository";
import { AuthService } from "../../../infrastructure/services/AuthService";

export class CreateUserUseCase {
  constructor(
    private userRepository: IUserRepository,
    private authService: AuthService
  ) {}

  async execute(
    userData: Omit<User, "id" | "createdAt" | "updatedAt">
  ): Promise<User> {
    // Verificar si el usuario ya existe
    const existingUser = await this.userRepository.findByEmail(userData.email);
    if (existingUser) {
      throw new Error("User already exists");
    }

    // Encriptar la contraseña
    const hashedPassword = await this.authService.hashPassword(
      userData.password
    );

    // Crear el usuario con la contraseña encriptada
    const user = await this.userRepository.create({
      ...userData,
      password: hashedPassword,
    });

    return user;
  }
}
