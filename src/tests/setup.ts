import dotenv from "dotenv";

// Cargar variables de entorno de test
dotenv.config({ path: ".env.test" });

// Aumentar el timeout para las operaciones de base de datos
jest.setTimeout(10000);
