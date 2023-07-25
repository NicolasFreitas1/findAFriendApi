import { PetGalleryRepository } from "@/repositories/pet-gallery-repository";
import { Photo } from "@prisma/client";
import fs from "node:fs";
import path from "node:path";

interface FindManyPetPhotosRequestUseCase {
  petId: string;
}

interface objectImage {
  data: string;
  name: string;
  id: string;
  created_at: Date;
  pet_id: string;
  name_stored: string;
}

interface FindManyPetPhotosResponseUseCase {
  imageData: objectImage[];
}
export class FindManyPetPhotosUseCase {
  constructor(private petGalleryRepository: PetGalleryRepository) {}

  async execute({
    petId,
  }: FindManyPetPhotosRequestUseCase): Promise<FindManyPetPhotosResponseUseCase> {
    const petGallery = await this.petGalleryRepository.findMany(petId);

    const folderPath = process.cwd() + "/uploads/";
    const imageData: any[] = [];

    for (const image of petGallery) {
      const filePath = path.join(folderPath, image.name_stored);
      const b64Image = fs.readFileSync(filePath, { encoding: "base64" });
      const objectImage = { ...image, data: b64Image };
      imageData.push(objectImage);
    }

    return {
      imageData,
    };
  }
}
