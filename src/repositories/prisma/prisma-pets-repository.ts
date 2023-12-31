import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { PetFilter, PetsRepository } from "../pets-repository";

export class PrismaPetRepository implements PetsRepository {
  async findById(id: string) {
    const pet = await prisma.pet.findUnique({
      where: {
        id,
      },
    });

    return pet;
  }

  async findMany(city: string, data: PetFilter) {
    const pets = await prisma.pet.findMany({
      where: {
        city,
        ...data,
      },
    });

    return pets;
  }

  async findByOrgId(orgId: string) {
    const pets = await prisma.pet.findMany({
      where: {
        org_id: orgId,
      },
    });

    return pets;
  }

  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = await prisma.pet.create({
      data,
    });

    return pet;
  }
}
