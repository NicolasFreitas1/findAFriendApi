import { InMemoryAdoptionRequirements } from "@/repositories/in-memory/in-memory-adoption-requirements-repository";
import { InMemoryOrgRepository } from "@/repositories/in-memory/in-memory-orgs-repository";
import { InMemoryPetRepository } from "@/repositories/in-memory/in-memory-pets-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { CreatePetGalleryUseCase } from "./create-pet-gallery";
import { InMemoryPetGalleryRepository } from "@/repositories/in-memory/in-memory-pet-gallery-repository";

let petGalleryRepository: InMemoryPetGalleryRepository;
let petRepository: InMemoryPetRepository;
let sut: CreatePetGalleryUseCase;

describe("Create Pet Gallery Use Case", () => {
  beforeEach(() => {
    petGalleryRepository = new InMemoryPetGalleryRepository();
    petRepository = new InMemoryPetRepository();
    sut = new CreatePetGalleryUseCase(petGalleryRepository);
  });

  it("should be able to create pet adoption requirements", async () => {
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

    const { photo } = await sut.execute({
      name: "Photo 1",
      nmStored: "encrypted name",
      petId: createdPet.id,
    });

    expect(photo.name).toEqual("Photo 1");
  });
});
