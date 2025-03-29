export enum UserRole {
  SUPER_ADMIN = "super_admin",
  ADMIN = "admin",
  INSTRUCTOR = "instructor",
}

export class User {
  constructor(
    public email: string,
    public password: string,
    public name: string,
    public lastName: string,
    public role: UserRole,
    public gyms: string[] = [], // Array de IDs de gimnasios
    public createdAt: Date = new Date(),
    public updatedAt: Date = new Date()
  ) {}
}
