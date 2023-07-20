import { InMemoryOrgRepository } from "@/repositories/in-memory/in-memory-orgs-repository";
import { hash } from "bcrypt";
import { beforeEach, describe, expect, it } from "vitest";
import { GetOrgProfileUseCase } from "./get-org-profile";
import { ResourceNotFoundError } from "./errors/resource-not-found";

let orgsRepository: InMemoryOrgRepository;
let sut: GetOrgProfileUseCase;

describe("Get Org Profile Use Case", () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgRepository();
    sut = new GetOrgProfileUseCase(orgsRepository);
  });

  it("should be able to get a org profile", async () => {
    const createdOrg = await orgsRepository.create({
      name: "New Pet Org",
      email: "org@email.com",
      password_hash: await hash("123456", 6),
      phone: "4899999999",
      cep: "88813581",
      address: "Rua Antonio José Olímpio",
    });

    const { org } = await sut.execute({
      orgId: createdOrg.id,
    });

    expect(org.name).toEqual("New Pet Org");
  });

  it("should not be able to get org profile with wrong id", async () => {
    await expect(() =>
      sut.execute({
        orgId: "non-existing-id",
      })
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
