import { PrismaPetGalleryRepository } from "@/repositories/prisma/prisma-pet-gallery-repository";
import { FindManyPetPhotosUseCase } from "@/use-cases/pet-gallery/find-many-pet-photos";

export function makeFindManyPetPhotosUseCase() {
  const petGalleryRepository = new PrismaPetGalleryRepository();

  const findManyPetPhotosUseCase = new FindManyPetPhotosUseCase(
    petGalleryRepository
  );

  return findManyPetPhotosUseCase;
}
