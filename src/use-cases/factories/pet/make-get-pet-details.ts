import { PrismaPetRepository } from "@/repositories/prisma/prisma-pets-repository";
import { GetPetDetailsUseCase } from "@/use-cases/pet-use-case/get-pet-details";

export function makeGetPetDetailsUseCase() {
  const petsRepository = new PrismaPetRepository();
  const getPetDetailsUseCase = new GetPetDetailsUseCase(petsRepository);

  return getPetDetailsUseCase;
}
