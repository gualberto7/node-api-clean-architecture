export class Client {
  constructor(
    public id: string,
    public ci: string,
    public name: string,
    public lastName: string,
    public email: string,
    public phone: string,
    public gymId: string, // ID del gimnasio al que pertenece
    public membershipId?: string, // ID de la membresía activa (opcional)
    public birthDate?: Date,
    public gender?: string,
    public address?: string,
    public emergencyContact?: {
      name: string;
      phone: string;
      relationship: string;
    },
    public createdAt: Date = new Date(),
    public updatedAt: Date = new Date()
  ) {}
}
