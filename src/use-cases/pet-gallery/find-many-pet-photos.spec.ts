import { InMemoryPetGalleryRepository } from "@/repositories/in-memory/in-memory-pet-gallery-repository";
import { InMemoryPetRepository } from "@/repositories/in-memory/in-memory-pets-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { FindManyPetPhotosUseCase } from "./find-many-pet-photos";

let petGalleryRepository: InMemoryPetGalleryRepository;
let petRepository: InMemoryPetRepository;
let sut: FindManyPetPhotosUseCase;

describe("Find Many Pet Gallery Use Case", () => {
  beforeEach(() => {
    petGalleryRepository = new InMemoryPetGalleryRepository();
    petRepository = new InMemoryPetRepository();
    sut = new FindManyPetPhotosUseCase(petGalleryRepository);
  });

  it("should be able to find many pet photos", async () => {
    const createdPet = await petRepository.create({
      name: "Bob",
      description: "Bob is a dog",
      city: "Criciúma",
      age: "BABY",
      size: "SMALL",
      energy_level: "HIGH",
      independence_level: "LOW",
      environment: "MEDIUM",
      org_id: "Org-01",
    });

    const photo1 = await petGalleryRepository.create(
      "Photo 1",
      "encrypted name",
      createdPet.id
    );

    const photo2 = await petGalleryRepository.create(
      "Photo 2",
      "encrypted name",
      createdPet.id
    );

    const { imageData } = await sut.execute({
      petId: createdPet.id,
    });

    expect(imageData).toHaveLength(2);
  });
});
