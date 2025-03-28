import { Request, Response } from "express";
import { CreateUserUseCase } from "../../application/useCases/user/CreateUserUseCase";
import { IUserRepository } from "../../domain/repositories/IUserRepository";
import { AuthService } from "../../infrastructure/services/AuthService";

export class UserController {
  constructor(
    private userRepository: IUserRepository,
    private authService: AuthService
  ) {}

  async createUser(req: Request, res: Response) {
    try {
      const createUserUseCase = new CreateUserUseCase(
        this.userRepository,
        this.authService
      );
      const user = await createUserUseCase.execute(req.body);
      return res.status(201).json(user);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      } else {
        return res.status(500).json({ message: "Internal server error" });
      }
    }
  }

  async getUserById(req: Request, res: Response) {
    try {
      const user = await this.userRepository.findById(req.params.id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      return res.json(user);
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  async getAllUsers(req: Request, res: Response) {
    try {
      const users = await this.userRepository.findAll();
      return res.json(users);
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  async updateUser(req: Request, res: Response) {
    try {
      const user = await this.userRepository.update(req.params.id, req.body);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      return res.json(user);
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  async deleteUser(req: Request, res: Response) {
    try {
      const result = await this.userRepository.delete(req.params.id);
      if (!result) {
        return res.status(404).json({ message: "User not found" });
      }
      return res.status(204).send();
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
  }
}
