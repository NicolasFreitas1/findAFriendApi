import { Photo } from "@prisma/client";

export interface PetGalleryRepository {
  create(name: string, nmStored: string, petId: string): Promise<Photo>;
}
