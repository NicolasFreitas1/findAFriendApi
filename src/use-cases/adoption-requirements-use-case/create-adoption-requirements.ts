import { AdoptionRequirementsRepository } from "@/repositories/adoption-requirements-repository";
import { AdoptionRequirements } from "@prisma/client";

interface CreateAdoptionRequirementsRequestUseCase {
  title: string;
  petId: string;
}

interface CreateAdoptionRequirementsResponseUseCase {
  adoptionRequirements: AdoptionRequirements;
}
export class CreateAdoptionRequirementsUseCase {
  constructor(
    private adoptionRequirementsRepository: AdoptionRequirementsRepository
  ) {}

  async execute({
    title,
    petId,
  }: CreateAdoptionRequirementsRequestUseCase): Promise<CreateAdoptionRequirementsResponseUseCase> {
    const adoptionRequirements =
      await this.adoptionRequirementsRepository.create({
        title,
        pet_id: petId,
      });

    return {
      adoptionRequirements,
    };
  }
}
