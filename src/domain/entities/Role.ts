export class Role {
  constructor(
    public name: string,
    public description: string,
    public permissions: string[] = [], // Array de IDs de permisos
    public isSystem: boolean = false, // Indica si es un rol del sistema (no se puede eliminar)
    public createdAt: Date = new Date(),
    public updatedAt: Date = new Date(),
    public _id?: string
  ) {}
}
