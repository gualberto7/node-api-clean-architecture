import dotenv from "dotenv";
import { connectDB } from "../infrastructure/config/database";
import { DatabaseSeeder } from "../infrastructure/seeders/DatabaseSeeder";

dotenv.config();

async function main() {
  try {
    await connectDB();
    const seeder = new DatabaseSeeder();
    await seeder.seed();
    console.log("Seeding completed successfully");
    process.exit(0);
  } catch (error) {
    console.error("Error during seeding:", error);
    process.exit(1);
  }
}

main();
