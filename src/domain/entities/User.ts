export interface User {
  id?: string;
  email: string;
  password: string;
  name: string;
  lastName: string;
  role: "user" | "admin" | "owner";
  createdAt?: Date;
  updatedAt?: Date;
}
