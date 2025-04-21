export class Permission {
  constructor(
    public name: string,
    public description: string,
    public code: string, // Código único para identificar el permiso (ej: "user:create")
    public createdAt: Date = new Date(),
    public updatedAt: Date = new Date(),
    public _id?: string
  ) {}
}
