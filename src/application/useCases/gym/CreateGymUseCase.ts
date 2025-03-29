import { IGymRepository } from "../../../domain/repositories/IGymRepository";
import { Gym } from "../../../domain/entities/Gym";

export class CreateGymUseCase {
  constructor(private gymRepository: IGymRepository) {}

  async execute(
    gymData: Omit<Gym, "_id" | "createdAt" | "updatedAt" | "ownerId">,
    ownerId: string
  ): Promise<Gym> {
    const gym = new Gym(
      gymData.name,
      gymData.address,
      gymData.phone,
      gymData.email,
      ownerId,
      gymData.memberships,
      gymData.clients,
      gymData.staff
    );

    return this.gymRepository.create(gym);
  }
}
