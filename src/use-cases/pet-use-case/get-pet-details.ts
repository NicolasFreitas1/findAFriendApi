import { PetsRepository } from "@/repositories/pets-repository";
import { Pet } from "@prisma/client";
import { ResourceNotFoundError } from "../errors/resource-not-found";

interface GetPetDetailsUseCaseRequest {
  petId: string;
}

interface GetPetDetailsUseCaseResponse {
  pet: Pet;
}

export class GetPetDetailsUseCase {
  constructor(private petRepository: PetsRepository) {}

  async execute({
    petId,
  }: GetPetDetailsUseCaseRequest): Promise<GetPetDetailsUseCaseResponse> {
    const pet = await this.petRepository.findById(petId);

    if (!pet) throw new ResourceNotFoundError();

    return {
      pet,
    };
  }
}
