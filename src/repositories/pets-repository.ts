import {
  Age,
  EnergyLevel,
  IndependenceLevel,
  Pet,
  Prisma,
  Size,
  Environment,
} from "@prisma/client";

export interface PetFilter {
  age?: Age;
  size?: Size;
  energy_level?: EnergyLevel;
  independence_level?: IndependenceLevel;
  environment?: Environment;
}
export interface PetsRepository {
  findById(id: string): Promise<Pet | null>;
  findMany(city: string, data?: PetFilter): Promise<Pet[]>;
  findByOrgId(orgId: string): Promise<Pet[]>;
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>;
}
