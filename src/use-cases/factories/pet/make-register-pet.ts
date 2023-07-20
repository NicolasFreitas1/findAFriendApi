import { PrismaPetRepository } from "@/repositories/prisma/prisma-pets-repository";
import { RegisterPetUseCase } from "@/use-cases/pet-use-case/register-pet";

export function makeRegisterPetUseCase() {
  const petsRepository = new PrismaPetRepository();
  const registerPetUseCase = new RegisterPetUseCase(petsRepository);

  return registerPetUseCase;
}
