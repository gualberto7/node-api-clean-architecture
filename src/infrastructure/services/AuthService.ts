import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export class AuthService {
  private readonly JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";
  private readonly JWT_EXPIRES_IN = "24h";

  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
  }

  async comparePasswords(
    password: string,
    hashedPassword: string
  ): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }

  generateToken(userId: string, email: string): string {
    return jwt.sign({ userId, email }, this.JWT_SECRET, {
      expiresIn: this.JWT_EXPIRES_IN,
    });
  }

  verifyToken(token: string): any {
    try {
      return jwt.verify(token, this.JWT_SECRET);
    } catch (error) {
      throw new Error("Invalid token");
    }
  }
}
