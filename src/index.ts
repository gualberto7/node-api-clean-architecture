import express from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import { MongoUserRepository } from "./infrastructure/repositories/MongoUserRepository";
import { MongoGymRepository } from "./infrastructure/repositories/MongoGymRepository";
import { MongoClientRepository } from "./infrastructure/repositories/MongoClientRepository";
import { MongoMembershipRepository } from "./infrastructure/repositories/MongoMembershipRepository";
import { createUserRoutes } from "./interfaces/routes/userRoutes";
import { createGymRoutes } from "./interfaces/routes/gymRoutes";
import { createClientRoutes } from "./interfaces/routes/clientRoutes";
import { createAuthRoutes } from "./interfaces/routes/authRoutes";
import { createMembershipRoutes } from "./interfaces/routes/membershipRoutes";
import { AuthService } from "./infrastructure/services/AuthService";
import { authMiddleware } from "./interfaces/middleware/authMiddleware";
import { connectDB } from "./infrastructure/config/database";
import { createSubscriptionRoutes } from "./interfaces/routes/subscriptionRoutes";
import { MongoSubscriptionRepository } from "./infrastructure/repositories/MongoSubscriptionRepository";
import { createEntryRoutes } from "./interfaces/routes/entryRoutes";
import { MongoEntryRepository } from "./infrastructure/repositories/MongoEntryRepository";

// Load environment variables
dotenv.config();

// Initialize express app
export const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Initialize services
const authService = new AuthService();
const userRepository = new MongoUserRepository();
const gymRepository = new MongoGymRepository();
const clientRepository = new MongoClientRepository();
const membershipRepository = new MongoMembershipRepository();
const subscriptionRepository = new MongoSubscriptionRepository();
const entryRepository = new MongoEntryRepository();

// Routes
app.get("/", (_req, res) => {
  res.json({ message: "Welcome to Gym API" });
});

// Public routes
app.use(
  "/api/auth",
  createAuthRoutes(userRepository, gymRepository, authService)
);

// Protected routes
app.use(
  "/api/users",
  authMiddleware(authService),
  createUserRoutes(userRepository, authService)
);

app.use(
  "/api/gyms",
  authMiddleware(authService),
  createGymRoutes(gymRepository)
);

app.use(
  "/api",
  authMiddleware(authService),
  createClientRoutes(clientRepository, subscriptionRepository),
  createMembershipRoutes(membershipRepository),
  createSubscriptionRoutes(subscriptionRepository),
  createEntryRoutes(entryRepository)
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

// Solo iniciar el servidor si no estamos en modo test
if (process.env.NODE_ENV !== "test") {
  startServer();
}
