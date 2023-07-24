import { InMemoryOrgRepository } from "@/repositories/in-memory/in-memory-orgs-repository";
import { InMemoryPetRepository } from "@/repositories/in-memory/in-memory-pets-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { GetPetDetailsUseCase } from "./get-pet-details";
import { ResourceNotFoundError } from "../errors/resource-not-found";

let petRepository: InMemoryPetRepository;
let sut: GetPetDetailsUseCase;

describe("Get pet details Use Case", () => {
  beforeEach(() => {
    petRepository = new InMemoryPetRepository();
    sut = new GetPetDetailsUseCase(petRepository);
  });

  it("should be able to get pet details by pet id", async () => {
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

    const { pet } = await sut.execute({ petId: createdPet.id });

    expect(pet.name).toEqual("Bob");
  });

  it("should not be able to get pet details with wrong pet id", async () => {
    await expect(() =>
      sut.execute({
        petId: "non-existing-id",
      })
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
