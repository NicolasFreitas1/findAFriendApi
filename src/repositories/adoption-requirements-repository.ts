import { AdoptionRequirements, Prisma } from "@prisma/client";

export interface AdoptionRequirementsRepository {
  create(
    data: Prisma.AdoptionRequirementsUncheckedCreateInput
  ): Promise<AdoptionRequirements>;
  findMany(petId: string): Promise<AdoptionRequirements[]>;
}
