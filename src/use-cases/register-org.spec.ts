import { InMemoryOrgRepository } from "@/repositories/in-memory/in-memory-orgs-repository";
import { compare } from "bcrypt";
import { beforeEach, describe, expect, it } from "vitest";
import { RegisterOrgUseCase } from "./register-org";
import { OrgAlreadyExistsError } from "./errors/org-already-exists";

let orgsRepository: InMemoryOrgRepository;
let sut: RegisterOrgUseCase;

describe("Register Org Use Case", () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgRepository();
    sut = new RegisterOrgUseCase(orgsRepository);
  });

  it("should be able to register a new org", async () => {
    const { org } = await sut.execute({
      name: "New Pet Org",
      email: "org@email.com",
      password: "123456",
      phone: "4899999999",
      cep: "88813581",
      address: "Rua Antonio José Olímpio",
    });

    expect(org.id).toEqual(expect.any(String));
  });

  it("should hash org password upon registration", async () => {
    const { org } = await sut.execute({
      name: "New Pet Org",
      email: "org@email.com",
      password: "123456",
      phone: "4899999999",
      cep: "88813581",
      address: "Rua Antonio José Olímpio",
    });

    const isPasswordCorrectlyHashed = await compare(
      "123456",
      org.password_hash
    );

    expect(isPasswordCorrectlyHashed).toBe(true);
  });

  it("should not be able to register the same email twice", async () => {
    const email = "org@email.com";

    await sut.execute({
      name: "New Pet Org",
      email,
      password: "123456",
      phone: "4899999999",
      cep: "88813581",
      address: "Rua Antonio José Olímpio",
    });

    await expect(() =>
      sut.execute({
        name: "New Pet Org",
        email,
        password: "123456",
        phone: "4899999999",
        cep: "88813581",
        address: "Rua Antonio José Olímpio",
      })
    ).rejects.toBeInstanceOf(OrgAlreadyExistsError);
  });
});
