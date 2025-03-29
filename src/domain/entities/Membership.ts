export class Membership {
  constructor(
    public name: string,
    public price: number,
    public duration: number, // Duración en días
    public gymId: string, // ID del gimnasio que ofrece esta membresía
    public maxEntries: number,
    public benefits: string[] = [], // Lista de beneficios incluidos
    public createdAt: Date = new Date(),
    public updatedAt: Date = new Date(),
    public createdBy: string,
    public updatedBy: string
  ) {}
}
