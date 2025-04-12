export enum UserRole {
  SUPER_ADMIN = "super_admin",
  ADMIN = "admin",
  OWNER = "owner",
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
    public active: boolean = true, // Campo para activar/desactivar usuarios
    public createdAt: Date = new Date(),
    public updatedAt: Date = new Date(),
    public _id?: string
  ) {}
}
