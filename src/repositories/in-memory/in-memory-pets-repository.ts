import {
  Age,
  EnergyLevel,
  Environment,
  IndependenceLevel,
  Pet,
  Prisma,
  Size,
} from "@prisma/client";
import { PetsRepository } from "../pets-repository";
import { randomUUID } from "crypto";
import { GetResult } from "@prisma/client/runtime/library";

export class InMemoryPetRepository implements PetsRepository {
  public items: Pet[] = [];

  async findByOrgId(orgId: string) {
    return this.items.filter((item) => item.org_id === orgId);
  }

  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = {
      id: randomUUID(),
      name: data.name,
      description: data.description,
      city: data.city,
      age: data.age,
      size: data.size,
      energy_level: data.energy_level,
      independence_level: data.independence_level,
      environment: data.environment,
      org_id: data.org_id,
      created_at: new Date(),
    };

    this.items.push(pet);

    return pet;
  }
}
