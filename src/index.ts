import express from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { MongoUserRepository } from "./infrastructure/repositories/MongoUserRepository";
import { createUserRoutes } from "./interfaces/routes/userRoutes";
import { createAuthRoutes } from "./interfaces/routes/authRoutes";
import { AuthService } from "./infrastructure/services/AuthService";
import { authMiddleware } from "./interfaces/middleware/authMiddleware";

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Database connection
mongoose
  .connect(process.env.MONGODB_URI || "mongodb://localhost:27017/gym-api")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });

// Services
const authService = new AuthService();

// Routes
const userRepository = new MongoUserRepository();

// Public routes
app.use("/api/auth", createAuthRoutes(userRepository, authService));

// Protected routes
app.use("/api/users", createUserRoutes(userRepository, authService));

// Basic route
app.get("/", (_req, res) => {
  res.json({ message: "Welcome to Gym API" });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
