import { IMembershipRepository } from "../../domain/repositories/IMembershipRepository";
import { Membership } from "../../domain/entities/Membership";
import { BaseRepository } from "../../domain/repositories/BaseRepository";
import { MembershipDocument } from "../models/MembershipModel";
import { MembershipModel } from "../models/MembershipModel";

export class MongoMembershipRepository
  extends BaseRepository<MembershipDocument>
  implements IMembershipRepository
{
  constructor() {
    super(MembershipModel);
  }

  async create(membership: Membership): Promise<Membership> {
    const newMembership = new this.model(membership);
    return (await newMembership.save()) as Membership;
  }

  async findById(id: string): Promise<Membership | null> {
    return await this.model.findById(id);
  }

  async findByGymId(gymId: string): Promise<Membership[]> {
    const query = { gym: gymId };
    return await this.model.find(query);
  }

  async findByClientId(clientId: string): Promise<Membership[]> {
    return await this.model.find({ clientId });
  }

  async update(
    id: string,
    membership: Partial<Membership>
  ): Promise<Membership | null> {
    return await this.model.findByIdAndUpdate(id, membership, {
      new: true,
    });
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.model.findByIdAndDelete(id);
    return result !== null;
  }

  async updateStatus(id: string, status: string): Promise<Membership | null> {
    return await this.model.findByIdAndUpdate(id, { status }, { new: true });
  }
}
