import {
  Age,
  EnergyLevel,
  Environment,
  IndependenceLevel,
  Prisma,
  Size,
} from "@prisma/client";
import { PetsRepository } from "../pets-repository";
import { prisma } from "@/lib/prisma";
import { GetResult } from "@prisma/client/runtime/library";

export class PrismaPetRepository implements PetsRepository {
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
