import { PrismaAdoptionRequirementsRepository } from "@/repositories/prisma/prisma-adoption-requirements-repository";
import { PrismaPetGalleryRepository } from "@/repositories/prisma/prisma-pet-gallery-repository";
import { CreateAdoptionRequirementsUseCase } from "@/use-cases/adoption-requirements-use-case/create-adoption-requirements";
import { CreatePetGalleryUseCase } from "@/use-cases/pet-gallery/create-pet-gallery";

export function makeCreatePetGalleryUseCase() {
  const petGalleryRepository = new PrismaPetGalleryRepository();

  const createPetGalleryUseCase = new CreatePetGalleryUseCase(
    petGalleryRepository
  );

  return createPetGalleryUseCase;
}
