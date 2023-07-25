import { PrismaAdoptionRequirementsRepository } from "@/repositories/prisma/prisma-adoption-requirements-repository";
import { CreateAdoptionRequirementsUseCase } from "@/use-cases/adoption-requirements-use-case/create-adoption-requirements";

export async function makeCreateAdoptionRequirementsUseCase() {
  const adoptionRequirementsRepository =
    new PrismaAdoptionRequirementsRepository();

  const createAdoptionRequirementsRequestUseCase =
    new CreateAdoptionRequirementsUseCase(adoptionRequirementsRepository);

  return createAdoptionRequirementsRequestUseCase;
}
