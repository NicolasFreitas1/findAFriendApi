import { PrismaAdoptionRequirementsRepository } from "@/repositories/prisma/prisma-adoption-requirements-repository";
import { FindManyAdoptionRequirementsUseCase } from "@/use-cases/adoption-requirements-use-case/find-many-adoption-requirements";

export function makeFindManyAdoptionRequirementsUseCase() {
  const adoptionRequirementsRepository =
    new PrismaAdoptionRequirementsRepository();

  const findManyAdoptionRequirementsUseCase =
    new FindManyAdoptionRequirementsUseCase(adoptionRequirementsRepository);

  return findManyAdoptionRequirementsUseCase;
}
