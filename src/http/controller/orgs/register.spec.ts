import request from "supertest";
import { app } from "@/app";
import { afterEach, beforeAll, describe, expect, it } from "vitest";

describe("Register Orgs (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterEach(async () => {
    await app.close();
  });

  it("should be able to register", async () => {
    const response = await request(app.server).post("/orgs").send({
      name: "Pet Org",
      email: "org@test.com",
      password: "123456",
      phone: "4899999999",
      cep: "88813581",
      address: "Rua Antonio José Olímpio",
    });

    expect(response.statusCode).toEqual(201);
  });
});
