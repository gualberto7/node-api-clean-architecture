import { IUserRepository } from "../../../domain/repositories/IUserRepository";
import { AuthService } from "../../../infrastructure/services/AuthService";

export class LoginUseCase {
  constructor(
    private userRepository: IUserRepository,
    private authService: AuthService
  ) {}

  async execute(email: string, password: string) {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new Error("Invalid credentials");
    }

    const isValidPassword = await this.authService.comparePasswords(
      password,
      user.password
    );

    if (!isValidPassword) {
      throw new Error("Invalid credentials");
    }

    const token = this.authService.generateToken(user._id, user.email);

    return {
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        lastName: user.lastName,
        role: user.role,
      },
      token,
    };
  }
}
