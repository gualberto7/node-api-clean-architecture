import { Request, Response } from "express";
import { LoginUseCase } from "../../application/useCases/auth/LoginUseCase";
import { IUserRepository } from "../../domain/repositories/IUserRepository";
import { AuthService } from "../../infrastructure/services/AuthService";

export class AuthController {
  constructor(
    private userRepository: IUserRepository,
    private authService: AuthService
  ) {}

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res
          .status(400)
          .json({ message: "Email and password are required" });
      }

      const loginUseCase = new LoginUseCase(
        this.userRepository,
        this.authService
      );
      const result = await loginUseCase.execute(email, password);

      return res.json(result);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(401).json({ message: error.message });
      }
      return res.status(500).json({ message: "Internal server error" });
    }
  }
}
