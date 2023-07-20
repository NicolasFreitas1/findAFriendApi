import { InMemoryOrgRepository } from "@/repositories/in-memory/in-memory-orgs-repository";
import { compare, hash } from "bcrypt";
import { beforeEach, describe, expect, it } from "vitest";
import { OrgAlreadyExistsError } from "../errors/org-already-exists";
import { AuthenticateOrgUseCase } from "./authenticate-org";
import { InvalidCredentialsError } from "../errors/invalid-credentials";

let orgsRepository: InMemoryOrgRepository;
let sut: AuthenticateOrgUseCase;

describe("Authenticate Org Use Case", () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgRepository();
    sut = new AuthenticateOrgUseCase(orgsRepository);
  });

  it("should be able to authenticate", async () => {
    await orgsRepository.create({
      name: "New Pet Org",
      email: "org@email.com",
      password_hash: await hash("123456", 6),
      phone: "4899999999",
      cep: "88813581",
      address: "Rua Antonio José Olímpio",
    });

    const { org } = await sut.execute({
      email: "org@email.com",
      password: "123456",
    });

    expect(org.id).toEqual(expect.any(String));
  });

  it("should not be able to authenticate with wrong email", async () => {
    await expect(() =>
      sut.execute({
        email: "john.doe@gmail.com",
        password: "123456",
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });

  it("should not be able to authenticate with wrong password", async () => {
    await orgsRepository.create({
      name: "New Pet Org",
      email: "org@email.com",
      password_hash: await hash("123456", 6),
      phone: "4899999999",
      cep: "88813581",
      address: "Rua Antonio José Olímpio",
    });

    await expect(() =>
      sut.execute({
        email: "john.doe@gmail.com",
        password: "12322",
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });
});
