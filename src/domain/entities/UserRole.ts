export class UserRole {
  constructor(
    public userId: string,
    public roleId: string,
    public gymId?: string, // Opcional: para roles específicos de un gimnasio
    public createdAt: Date = new Date(),
    public updatedAt: Date = new Date(),
    public _id?: string
  ) {}
}
