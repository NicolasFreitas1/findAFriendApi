import { PetsRepository } from "@/repositories/pets-repository";
import { Pet } from "@prisma/client";
import { ResourceNotFoundError } from "../errors/resource-not-found";

interface ListPetsUseCaseRequest {
  city: string;
}

interface ListPetsUseCaseResponse {
  pets: Pet[];
}

export class ListPetsUseCase {
  constructor(private petRepository: PetsRepository) {}
  
  async execute({ city }: ListPetsUseCaseRequest) {
    if (!city) throw new ResourceNotFoundError();

    const pets = await this.petRepository.findByCity(city);

    return {
      pets,
    };
  }
}
