# Gym API

A robust RESTful API for gym management built with Node.js, Express, and TypeScript using Clean Architecture principles.

## 🏗️ Architecture

This project follows Clean Architecture principles, which separates the codebase into distinct layers:

### Domain Layer

The innermost layer containing business logic and entities:

- **Entities**: Core business objects (User, Gym, Client, Membership, etc.)
- **Repositories**: Interfaces defining data access patterns
- **Value Objects**: Immutable objects that represent domain concepts

### Application Layer

Contains use cases and application-specific business rules:

- **Use Cases**: Orchestrates the flow of data and implements application-specific business rules
- **Controllers**: Handles HTTP requests and responses
- **DTOs**: Data Transfer Objects for input/output

### Infrastructure Layer

Implements interfaces defined in the domain layer:

- **Repositories**: MongoDB implementations of repository interfaces
- **Models**: Mongoose schemas and models
- **Services**: External service implementations (Auth, etc.)
- **Routes**: Express route definitions
- **Factories**: Object creation helpers
- **Seeders**: Database seeding utilities

### Interface Layer

Handles external concerns:

- **Routes**: API endpoint definitions
- **Middleware**: Request/response processing
- **Validators**: Input validation

## 📁 Project Structure

```
src/
├── application/           # Application layer
│   ├── controllers/       # HTTP request handlers
│   └── useCases/         # Application business rules
├── config/                # Configuration files
├── domain/                # Domain layer
│   ├── entities/          # Business entities
│   ├── interfaces/        # Shared interfaces
│   └── repositories/      # Repository interfaces
├── infrastructure/        # Infrastructure layer
│   ├── config/            # Infrastructure configuration
│   ├── factories/         # Object factories
│   ├── models/            # Mongoose models
│   ├── repositories/      # Repository implementations
│   ├── routes/            # Route definitions
│   ├── seeders/           # Database seeders
│   └── services/          # External services
├── interfaces/            # Interface layer
│   ├── middleware/        # Express middleware
│   └── routes/            # Route handlers
├── scripts/               # Utility scripts
├── tests/                 # Test files
│   ├── client/            # Client-related tests
│   └── ...                # Other test files
└── index.ts               # Application entry point
```

## 🛠️ Technologies

- **Node.js**: JavaScript runtime
- **TypeScript**: Typed JavaScript
- **Express**: Web framework
- **MongoDB**: NoSQL database
- **Mongoose**: MongoDB ODM
- **JWT**: Authentication
- **Jest**: Testing framework
- **ESLint**: Code linting

## 📦 Dependencies

### Production Dependencies

- bcryptjs: Password hashing
- cors: Cross-Origin Resource Sharing
- dotenv: Environment variable management
- express: Web framework
- express-validator: Request validation
- helmet: Security headers
- jsonwebtoken: JWT authentication
- mongoose: MongoDB ODM

### Development Dependencies

- @faker-js/faker: Test data generation
- jest: Testing framework
- ts-jest: TypeScript support for Jest
- ts-node: TypeScript execution
- typescript: TypeScript compiler

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB
- pnpm (recommended) or npm

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/gym-api.git
   cd gym-api
   ```

2. Install dependencies:

   ```bash
   pnpm install
   ```

3. Create a `.env` file in the root directory with the following variables:

   ```
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/gym-api
   JWT_SECRET=your_jwt_secret
   ```

4. Build the project:

   ```bash
   pnpm build
   ```

5. Seed the database (optional):

   ```bash
   pnpm seed
   ```

6. Start the server:
   ```bash
   pnpm start
   ```

For development with hot-reloading:

```bash
pnpm dev
```

## 🧪 Testing

Run tests with:

```bash
pnpm test
```

The project uses Jest for testing with a real MongoDB database for integration tests. Tests are organized by entity and follow a clean structure.

## 📝 API Documentation

### Authentication

- `POST /api/auth/register`: Register a new user
- `POST /api/auth/login`: Login and receive JWT token
- `POST /api/auth/logout`: Logout (invalidate token)
- `GET /api/auth/me`: Get current user information

### Users

- `GET /api/users`: Get all users
- `GET /api/users/:id`: Get user by ID
- `PUT /api/users/:id`: Update user
- `DELETE /api/users/:id`: Delete user

### Gyms

- `GET /api/gyms`: Get all gyms
- `GET /api/gyms/:id`: Get gym by ID
- `POST /api/gyms`: Create a new gym
- `PUT /api/gyms/:id`: Update gym
- `DELETE /api/gyms/:id`: Delete gym

### Clients

- `GET /api/clients`: Get all clients
- `GET /api/clients/:id`: Get client by ID
- `POST /api/clients`: Create a new client
- `PUT /api/clients/:id`: Update client
- `DELETE /api/clients/:id`: Delete client

### Memberships

- `GET /api/memberships`: Get all memberships
- `GET /api/memberships/:id`: Get membership by ID
- `POST /api/memberships`: Create a new membership
- `PUT /api/memberships/:id`: Update membership
- `DELETE /api/memberships/:id`: Delete membership

### Subscriptions

- `GET /api/subscriptions`: Get all subscriptions
- `GET /api/subscriptions/:id`: Get subscription by ID
- `POST /api/subscriptions`: Create a new subscription
- `PUT /api/subscriptions/:id`: Update subscription
- `DELETE /api/subscriptions/:id`: Delete subscription

### Entries

- `GET /api/entries`: Get all entries
- `GET /api/entries/:id`: Get entry by ID
- `POST /api/entries`: Create a new entry
- `PUT /api/entries/:id`: Update entry
- `DELETE /api/entries/:id`: Delete entry

## 🔐 Authorization

The API uses JWT (JSON Web Tokens) for authentication. Protected routes require a valid token in the Authorization header:

```
Authorization: Bearer <token>
```

## 🧩 Design Patterns

- **Repository Pattern**: Abstracts data persistence operations
- **Factory Pattern**: Creates objects without exposing creation logic
- **Dependency Injection**: Injects dependencies rather than creating them
- **Middleware Pattern**: Processes requests/responses
- **Service Layer Pattern**: Encapsulates business logic

## 📈 Pagination

The API supports pagination for list endpoints with the following parameters:

- `page`: Page number (default: 1)
- `limit`: Items per page (default: 10)
- `sort`: Field to sort by (default: createdAt)
- `order`: Sort order (asc/desc, default: desc)

## 🔄 Error Handling

The API uses a consistent error response format:

```json
{
  "success": false,
  "message": "Error message",
  "errors": [
    {
      "field": "fieldName",
      "message": "Field-specific error"
    }
  ]
}
```

## 📄 License

This project is licensed under the ISC License.

## 👥 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
