import express from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { MongoUserRepository } from "./infrastructure/repositories/MongoUserRepository";
import { createUserRoutes } from "./interfaces/routes/userRoutes";

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

// Routes
const userRepository = new MongoUserRepository();
app.use("/api/users", createUserRoutes(userRepository));

// Basic route
app.get("/", (_req, res) => {
  res.json({ message: "Welcome to Gym API" });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
