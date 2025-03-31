import { Schema } from "mongoose";

export class Client {
  constructor(
    public ci: string,
    public name: string,
    public email: string,
    public phone: string,
    public gym: Schema.Types.ObjectId,
    public birthDate?: Date,
    public gender?: string,
    public address?: string,
    public emergencyContact?: {
      name: string;
      phone: string;
      relationship: string;
    },
    public createdAt: Date = new Date(),
    public updatedAt: Date = new Date(),
    public _id?: string
  ) {}
}
