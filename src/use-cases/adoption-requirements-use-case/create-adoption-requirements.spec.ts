import { InMemoryAdoptionRequirements } from "@/repositories/in-memory/in-memory-adoption-requirements-repository";
import { InMemoryOrgRepository } from "@/repositories/in-memory/in-memory-orgs-repository";
import { InMemoryPetRepository } from "@/repositories/in-memory/in-memory-pets-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { CreateAdoptionRequirementsUseCase } from "./create-adoption-requirements";

let adoptionRequirementsRepository: InMemoryAdoptionRequirements;
let petRepository: InMemoryPetRepository;
let orgRepository: InMemoryOrgRepository;
let sut: CreateAdoptionRequirementsUseCase;

describe("Create Adoption Requirements Use Case", () => {
  beforeEach(() => {
    adoptionRequirementsRepository = new InMemoryAdoptionRequirements();
    petRepository = new InMemoryPetRepository();
    sut = new CreateAdoptionRequirementsUseCase(adoptionRequirementsRepository);
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

    const { adoptionRequirements } = await sut.execute({
      title: "Title requirement",
      petId: createdPet.id,
    });

    expect(adoptionRequirements.title).toEqual("Title requirement");
  });
});
