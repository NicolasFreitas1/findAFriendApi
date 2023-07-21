import { InMemoryOrgRepository } from "@/repositories/in-memory/in-memory-orgs-repository";
import { InMemoryPetRepository } from "@/repositories/in-memory/in-memory-pets-repository";
import { hash } from "bcrypt";
import { beforeEach, describe, expect, it } from "vitest";
import { GetPetsByOrgUseCase } from "./get-pets-by-org";

let petRepository: InMemoryPetRepository;
let orgRepository: InMemoryOrgRepository;
let sut: GetPetsByOrgUseCase;

describe("Find pets by Org Case", () => {
  beforeEach(() => {
    petRepository = new InMemoryPetRepository();
    orgRepository = new InMemoryOrgRepository();
    sut = new GetPetsByOrgUseCase(petRepository);
  });

  it("should be able to find pets by org id", async () => {
    const createdOrg = await orgRepository.create({
      name: "New Pet Org",
      email: "org@email.com",
      password_hash: await hash("123456", 6),
      phone: "4899999999",
      cep: "88813581",
      address: "Rua Antonio José Olímpio",
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
      org_id: createdOrg.id,
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
      org_id: createdOrg.id,
    });

    const { pets } = await sut.execute({ orgId: createdOrg.id });

    expect(pets).toHaveLength(2);
    expect(pets).toEqual([
      expect.objectContaining({ org_id: createdOrg.id }),
      expect.objectContaining({ org_id: createdOrg.id }),
    ]);
  });
});
