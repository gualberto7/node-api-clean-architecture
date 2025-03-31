import { IClientRepository } from "../../../domain/repositories/IClientRepository";
import { Client } from "../../../domain/entities/Client";
import { Schema } from "mongoose";

export class CreateClientUseCase {
  constructor(private clientRepository: IClientRepository) {}

  async execute(
    clientData: Omit<Client, "createdAt" | "updatedAt">,
    gymId: Schema.Types.ObjectId
  ): Promise<Client> {
    const client = new Client(
      clientData.ci,
      clientData.name,
      clientData.email,
      clientData.phone,
      gymId,
      clientData.birthDate,
      clientData.gender,
      clientData.address,
      clientData.emergencyContact
    );

    return this.clientRepository.create(client);
  }
}
