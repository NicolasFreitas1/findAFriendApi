import { PetsRepository } from "@/repositories/pets-repository";
import { Pet } from "@prisma/client";

interface ListPetsUseCaseRequest {
  city: string;
}

interface ListPetsUseCaseResponse {
  pets: Pet[];
}

export class ListPetsUseCase {
  constructor(private petRepository: PetsRepository) {}

  async execute({ city }: ListPetsUseCaseRequest) {
    const pets = await this.petRepository.findByCity(city);

    return {
      pets,
    };
  }
}
