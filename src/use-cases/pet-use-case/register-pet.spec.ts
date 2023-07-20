import { InMemoryPetRepository } from "@/repositories/in-memory/in-memory-pets-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { RegisterPetUseCase } from "./register-pet";
import { InMemoryOrgRepository } from "@/repositories/in-memory/in-memory-orgs-repository";
import { hash } from "bcrypt";
import { ResourceNotFoundError } from "../errors/resource-not-found";

let petRepository: InMemoryPetRepository;
let orgRepository: InMemoryOrgRepository;
let sut: RegisterPetUseCase;

describe("Register pet Use Case", () => {
  beforeEach(() => {
    petRepository = new InMemoryPetRepository();
    orgRepository = new InMemoryOrgRepository();
    sut = new RegisterPetUseCase(petRepository, orgRepository);
  });

  it("should be able to register a new pet", async () => {
    const createdOrg = await orgRepository.create({
      name: "New Pet Org",
      email: "org@email.com",
      password_hash: await hash("123456", 6),
      phone: "4899999999",
      cep: "88813581",
      address: "Rua Antonio José Olímpio",
    });

    const { pet } = await sut.execute({
      name: "Bob",
      description: "Bob is a dog",
      age: "BABY",
      size: "SMALL",
      energy_level: "HIGH",
      independence_level: "LOW",
      environment: "MEDIUM",
      org_id: createdOrg.id,
    });

    expect(pet.id).toEqual(expect.any(String));
  });

  it("should not be able to register a new pet with wrong org id", async () => {
    await expect(() =>
      sut.execute({
        name: "Bob",
        description: "Bob is a dog",
        age: "BABY",
        size: "SMALL",
        energy_level: "HIGH",
        independence_level: "LOW",
        environment: "MEDIUM",
        org_id: "wrong-org-id",
      })
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
