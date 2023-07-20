import { getGeoLocationByCEP } from "@/lib/location";
import { OrgsRepository } from "@/repositories/orgs-repository";
import { PetsRepository } from "@/repositories/pets-repository";
import {
  Age,
  EnergyLevel,
  Environment,
  IndependenceLevel,
  Pet,
  Size,
} from "@prisma/client";
import { ResourceNotFoundError } from "../errors/resource-not-found";

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
  constructor(
    private petRepository: PetsRepository,
    private orgRepository: OrgsRepository
  ) {}

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
    const org = await this.orgRepository.findById(org_id);

    if (!org) throw new ResourceNotFoundError();

    const { city } = await getGeoLocationByCEP(org.cep);

    const pet = await this.petRepository.create({
      name,
      description,
      city,
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
