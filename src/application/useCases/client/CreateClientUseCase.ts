import { IClientRepository } from "../../../domain/repositories/IClientRepository";
import { Client } from "../../../domain/entities/Client";

export class CreateClientUseCase {
  constructor(private clientRepository: IClientRepository) {}

  async execute(
    clientData: Omit<Client, "createdAt" | "updatedAt">,
    gymId: string
  ): Promise<Client> {
    const client = new Client(
      clientData.ci,
      clientData.name,
      clientData.email,
      clientData.phone,
      gymId,
      clientData.subscriptionId,
      clientData.birthDate,
      clientData.gender,
      clientData.address,
      clientData.emergencyContact
    );

    return this.clientRepository.create(client);
  }
}
