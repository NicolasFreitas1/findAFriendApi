import { AdoptionRequirementsRepository } from "@/repositories/adoption-requirements-repository";
import { PetGalleryRepository } from "@/repositories/pet-gallery-repository";
import { AdoptionRequirements, Photo } from "@prisma/client";

interface CreatePetGalleryRequestUseCase {
  name: string;
  nmStored: string
  petId: string;
}

interface CreatePetGalleryResponseUseCase {
  photo: Photo;
}
export class CreatePetGalleryUseCase {
  constructor(private petGalleryRepository: PetGalleryRepository) {}

  async execute({
    name,
    nmStored,
    petId,
  }: CreatePetGalleryRequestUseCase): Promise<CreatePetGalleryResponseUseCase> {
    const photo = await this.petGalleryRepository.create(name, nmStored, petId);

    return {
      photo,
    };
  }
}
