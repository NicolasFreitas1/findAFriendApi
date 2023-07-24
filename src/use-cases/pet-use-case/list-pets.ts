import { PetFilter, PetsRepository } from "@/repositories/pets-repository";
import { Pet } from "@prisma/client";
import { ResourceNotFoundError } from "../errors/resource-not-found";

interface ListPetsUseCaseRequest {
  city: string;
  data?: PetFilter;
}

interface ListPetsUseCaseResponse {
  pets: Pet[];
}

export class ListPetsUseCase {
  constructor(private petRepository: PetsRepository) {}

  async execute({
    city,
    data,
  }: ListPetsUseCaseRequest): Promise<ListPetsUseCaseResponse> {
    if (!city) throw new ResourceNotFoundError();

    const pets = await this.petRepository.findMany(city, data);

    return {
      pets,
    };
  }
}
