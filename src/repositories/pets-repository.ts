import { Pet, Prisma } from "@prisma/client";

export interface PetsRepository {
  findByOrgId(orgId: string): Promise<Pet[]>;
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>;
}
