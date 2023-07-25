import { AdoptionRequirements, Prisma } from "@prisma/client";
import { randomUUID } from "crypto";
import { AdoptionRequirementsRepository } from "../adoption-requirements-repository";
import { GetResult } from "@prisma/client/runtime/library";

export class InMemoryAdoptionRequirements
  implements AdoptionRequirementsRepository
{
  public items: AdoptionRequirements[] = [];

  async create(data: Prisma.AdoptionRequirementsUncheckedCreateInput) {
    const adoptionRequirements = {
      id: randomUUID(),
      title: data.title,
      pet_id: data.pet_id,
    };

    this.items.push(adoptionRequirements);

    return adoptionRequirements;
  }

  async findMany(petId: string) {
    return this.items.filter((item) => item.pet_id === petId);
  }
}
