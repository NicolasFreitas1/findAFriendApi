import { PrismaPetRepository } from "@/repositories/prisma/prisma-pets-repository";
import { GetPetsByOrgUseCase } from "@/use-cases/pet-use-case/get-pets-by-org";

export function makeGetPetsByOrgIdUseCase() {
  const petsRepository = new PrismaPetRepository();
  const getPetsByOrgIdUseCase = new GetPetsByOrgUseCase(petsRepository);

  return getPetsByOrgIdUseCase;
}
