import { InMemoryPetRepository } from "@/repositories/in-memory/in-memory-pets-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { ListPetsUseCase } from "./list-pets";
import { ResourceNotFoundError } from "../errors/resource-not-found";
import { Age } from "@prisma/client";

let petRepository: InMemoryPetRepository;
let sut: ListPetsUseCase;

describe("List pets by City Use Case", () => {
  beforeEach(() => {
    petRepository = new InMemoryPetRepository();
    sut = new ListPetsUseCase(petRepository);
  });

  it("should be able to find pets by city", async () => {
    await petRepository.create({
      name: "Bob",
      description: "Bob is a dog",
      city: "Criciúma",
      age: "BABY",
      size: "SMALL",
      energy_level: "HIGH",
      independence_level: "LOW",
      environment: "MEDIUM",
      org_id: "some org",
    });

    await petRepository.create({
      name: "Bob",
      description: "Bob is a dog",
      city: "Criciúma",
      age: "BABY",
      size: "SMALL",
      energy_level: "HIGH",
      independence_level: "LOW",
      environment: "MEDIUM",
      org_id: "some org",
    });

    const { pets } = await sut.execute({ city: "Criciúma" });

    expect(pets).toHaveLength(2);
    expect(pets).toEqual([
      expect.objectContaining({ city: "Criciúma" }),
      expect.objectContaining({ city: "Criciúma" }),
    ]);
  });

  it("should not be able to find pets without city", async () => {
    await expect(() => sut.execute({ city: "" })).rejects.toBeInstanceOf(
      ResourceNotFoundError
    );
  });

  it("should be able to filter pets", async () => {
    await petRepository.create({
      name: "Bob",
      description: "Bob is a dog",
      city: "Criciúma",
      age: "BABY",
      size: "SMALL",
      energy_level: "HIGH",
      independence_level: "LOW",
      environment: "MEDIUM",
      org_id: "some org",
    });

    await petRepository.create({
      name: "Bob",
      description: "Bob is a dog",
      city: "Criciúma",
      age: "OLD",
      size: "SMALL",
      energy_level: "HIGH",
      independence_level: "LOW",
      environment: "MEDIUM",
      org_id: "some org",
    });

    const { pets } = await sut.execute({
      city: "Criciúma",
      data: { age: Age.BABY },
    });

    expect(pets).toHaveLength(1);
    expect(pets).toEqual([expect.objectContaining({ age: "BABY" })]);
  });
});
