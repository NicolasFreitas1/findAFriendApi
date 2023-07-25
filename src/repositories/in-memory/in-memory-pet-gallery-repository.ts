import { Photo } from "@prisma/client";
import { randomUUID } from "crypto";
import { PetGalleryRepository } from "../pet-gallery-repository";

export class InMemoryPetGalleryRepository implements PetGalleryRepository {
  public items: Photo[] = [];
  async create(name: string, nmStored: string, petId: string) {
    const photo = {
      id: randomUUID(),
      name: name,
      name_stored: nmStored,
      pet_id: petId,
      created_at: new Date(),
    };

    this.items.push(photo);

    return photo;
  }
}
