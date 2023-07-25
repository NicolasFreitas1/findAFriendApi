import { prisma } from "@/lib/prisma";
import { PetGalleryRepository } from "../pet-gallery-repository";
import { GetResult } from "@prisma/client/runtime/library";

export class PrismaPetGalleryRepository implements PetGalleryRepository {
  async create(name: string, nmStored: string, petId: string) {
    const photo = await prisma.photo.create({
      data: {
        name,
        name_stored: nmStored,
        pet_id: petId,
      },
    });

    return photo;
  }
  async findMany(petId: string) {
    const photos = await prisma.photo.findMany({
      where: {
        pet_id: petId,
      },
    });

    return photos;
  }
}
