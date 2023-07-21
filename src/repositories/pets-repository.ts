import { Pet, Prisma } from "@prisma/client";

export interface PetsRepository {
  findByCity(city: string): Promise<Pet[]>;
  findByOrgId(orgId: string): Promise<Pet[]>;
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>;
}
