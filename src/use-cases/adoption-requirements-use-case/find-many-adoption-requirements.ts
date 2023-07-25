import { AdoptionRequirementsRepository } from "@/repositories/adoption-requirements-repository";
import { AdoptionRequirements } from "@prisma/client";

interface FindManyAdoptionRequirementsRequestUseCase {
  petId: string;
}

interface FindManyAdoptionRequirementsResponseUseCase {
  adoptionRequirements: AdoptionRequirements[];
}
export class FindManyAdoptionRequirementsUseCase {
  constructor(
    private adoptionRequirementsRepository: AdoptionRequirementsRepository
  ) {}

  async execute({
    petId,
  }: FindManyAdoptionRequirementsRequestUseCase): Promise<FindManyAdoptionRequirementsResponseUseCase> {
    const adoptionRequirements =
      await this.adoptionRequirementsRepository.findMany(petId);

    return {
      adoptionRequirements,
    };
  }
}
