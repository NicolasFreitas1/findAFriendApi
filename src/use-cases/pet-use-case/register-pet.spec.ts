import { compare } from "bcrypt";
import { beforeEach, describe, expect, it } from "vitest";
import { RegisterPetUseCase } from "./register-pet";
import { InMemoryPetRepository } from "@/repositories/in-memory/in-memory-pets-repository";

let petRepository: InMemoryPetRepository;
let sut: RegisterPetUseCase;

describe("Register pet Use Case", () => {
  beforeEach(() => {
    petRepository = new InMemoryPetRepository();
    sut = new RegisterPetUseCase(petRepository);
  });

  it("should be able to register a new pet", async () => {
    const { pet } = await sut.execute({
      name: "Bob",
      description: "Bob is a dog",
      age: "BABY",
      size: "SMALL",
      energy_level: "HIGH",
      independence_level: "LOW",
      environment: "MEDIUM",
      org_id: "org-id",
    });

    expect(pet.id).toEqual(expect.any(String));
  });
});
