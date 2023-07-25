import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { AdoptionRequirementsRepository } from "../adoption-requirements-repository";

export class PrismaAdoptionRequirementsRepository
  implements AdoptionRequirementsRepository
{
  async create(data: Prisma.AdoptionRequirementsUncheckedCreateInput) {
    const adoptionRequirements = await prisma.adoptionRequirements.create({
      data: {
        title: data.title,
        pet_id: data.pet_id,
      },
    });

    return adoptionRequirements;
  }

  async findMany(petId: string) {
    return prisma.adoptionRequirements.findMany({
      where: {
        pet_id: petId,
      },
    });
  }
}
