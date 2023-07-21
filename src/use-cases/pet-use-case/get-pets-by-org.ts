import { PetsRepository } from "@/repositories/pets-repository";
import { Pet } from "@prisma/client";

interface GetPetsByOrgUseCaseRequest {
  orgId: string;
}

interface GetPetsByOrgUseCaseResponse {
  pets: Pet[];
}

export class GetPetsByOrgUseCase {
  constructor(private petRepository: PetsRepository) {}

  async execute({
    orgId,
  }: GetPetsByOrgUseCaseRequest): Promise<GetPetsByOrgUseCaseResponse> {
    const pets = await this.petRepository.findByOrgId(orgId);

    return {
      pets,
    };
  }
}
