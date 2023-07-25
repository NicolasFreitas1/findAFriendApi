import { InMemoryAdoptionRequirements } from "@/repositories/in-memory/in-memory-adoption-requirements-repository";
import { InMemoryPetRepository } from "@/repositories/in-memory/in-memory-pets-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { FindManyAdoptionRequirementsUseCase } from "./find-many-adoption-requirements";

let adoptionRequirementsRepository: InMemoryAdoptionRequirements;
let petRepository: InMemoryPetRepository;
let sut: FindManyAdoptionRequirementsUseCase;

describe("Create Adoption Requirements Use Case", () => {
  beforeEach(() => {
    adoptionRequirementsRepository = new InMemoryAdoptionRequirements();
    petRepository = new InMemoryPetRepository();
    sut = new FindManyAdoptionRequirementsUseCase(
      adoptionRequirementsRepository
    );
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

    await adoptionRequirementsRepository.create({
      title: "Adoption Requirements Test",
      pet_id: createdPet.id,
    });

    await adoptionRequirementsRepository.create({
      title: "Adoption Requirements Test",
      pet_id: createdPet.id,
    });

    const { adoptionRequirements } = await sut.execute({
      petId: createdPet.id,
    });

    expect(adoptionRequirements).toHaveLength(2);
  });
});
