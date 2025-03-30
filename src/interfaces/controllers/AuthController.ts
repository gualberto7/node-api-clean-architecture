import { Request, Response } from "express";
import { LoginUseCase } from "../../application/useCases/auth/LoginUseCase";
import { IUserRepository } from "../../domain/repositories/IUserRepository";
import { IGymRepository } from "../../domain/repositories/IGymRepository";
import { AuthService } from "../../infrastructure/services/AuthService";
import { AuthRequest } from "../middleware/authMiddleware";

export class AuthController {
  constructor(
    private userRepository: IUserRepository,
    private gymRepository: IGymRepository,
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

  async logout(req: Request, res: Response) {
    console.log("logout");
    return res.status(200).json({ message: "Logged out successfully" });
  }

  async me(req: AuthRequest, res: Response) {
    const user = await this.userRepository.findById(req.user?.userId!);
    const gyms = await this.gymRepository.findByOwnerId(req.user?.userId!);
    return res.status(200).json({ user, gyms });
  }
}
