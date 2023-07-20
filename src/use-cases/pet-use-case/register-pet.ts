import { PetsRepository } from "@/repositories/pets-repository";
import {
  Age,
  EnergyLevel,
  Environment,
  IndependenceLevel,
  Pet,
  Size,
} from "@prisma/client";

interface RegisterPetUseCaseRequest {
  name: string;
  description: string;
  age: Age;
  size: Size;
  energy_level: EnergyLevel;
  independence_level: IndependenceLevel;
  environment: Environment;
  org_id: string;
}

interface RegisterPetUseCaseResponse {
  pet: Pet;
}

export class RegisterPetUseCase {
  constructor(private petRepository: PetsRepository) {}

  async execute({
    name,
    description,
    age,
    size,
    energy_level,
    independence_level,
    environment,
    org_id,
  }: RegisterPetUseCaseRequest): Promise<RegisterPetUseCaseResponse> {
    const pet = await this.petRepository.create({
      name,
      description,
      age,
      size,
      energy_level,
      independence_level,
      environment,
      org_id,
    });

    return {
      pet,
    };
  }
}
