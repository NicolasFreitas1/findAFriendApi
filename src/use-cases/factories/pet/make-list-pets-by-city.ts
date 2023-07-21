import { PrismaPetRepository } from "@/repositories/prisma/prisma-pets-repository";
import { ListPetsUseCase } from "@/use-cases/pet-use-case/list-pets";

export function makeListPetsUseCase() {
  const petsRepository = new PrismaPetRepository();
  const listPetsUseCase = new ListPetsUseCase(petsRepository);

  return listPetsUseCase;
}
