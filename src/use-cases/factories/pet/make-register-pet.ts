import { PrismaOrgRepository } from "@/repositories/prisma/prisma-orgs-repository";
import { PrismaPetRepository } from "@/repositories/prisma/prisma-pets-repository";
import { RegisterPetUseCase } from "@/use-cases/pet-use-case/register-pet";

export function makeRegisterPetUseCase() {
  const petsRepository = new PrismaPetRepository();
  const orgsRepository = new PrismaOrgRepository();
  const registerPetUseCase = new RegisterPetUseCase(
    petsRepository,
    orgsRepository
  );

  return registerPetUseCase;
}
