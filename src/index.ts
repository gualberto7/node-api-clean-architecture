import express from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import { MongoUserRepository } from "./infrastructure/repositories/MongoUserRepository";
import { createUserRoutes } from "./interfaces/routes/userRoutes";
import { createAuthRoutes } from "./interfaces/routes/authRoutes";
import { AuthService } from "./infrastructure/services/AuthService";
import { authMiddleware } from "./interfaces/middleware/authMiddleware";
import { connectDB } from "./infrastructure/config/database";

// Load environment variables
dotenv.config();

// Initialize express app
const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Initialize services
const authService = new AuthService();
const userRepository = new MongoUserRepository();

// Routes
app.get("/", (_req, res) => {
  res.json({ message: "Welcome to Gym API" });
});

// Public routes
app.use("/api/auth", createAuthRoutes(userRepository, authService));

// Protected routes
app.use(
  "/api/users",
  authMiddleware(authService),
  createUserRoutes(userRepository, authService)
);

// Start server
const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
