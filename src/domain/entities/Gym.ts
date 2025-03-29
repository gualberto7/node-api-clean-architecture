export class Gym {
  constructor(
    public name: string,
    public address: string,
    public phone: string,
    public email: string,
    public ownerId: string, // ID del usuario propietario
    public memberships: string[] = [], // Array de IDs de membresías
    public clients: string[] = [], // Array de IDs de clientes
    public staff: string[] = [], // Array de IDs de personal (admin e instructores)
    public createdAt: Date = new Date(),
    public updatedAt: Date = new Date(),
    public _id?: string
  ) {}
}
