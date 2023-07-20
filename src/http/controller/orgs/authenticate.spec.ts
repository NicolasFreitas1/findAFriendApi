import request from "supertest";
import { app } from "@/app";
import { beforeAll, describe, expect, it } from "vitest";
import { afterEach } from "node:test";

describe("Authenticate Orgs (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterEach(async () => {
    await app.close();
  });

  it("should be able to authenticate", async () => {
    await request(app.server).post("/orgs").send({
      name: "Pet Org",
      email: "org@test.com",
      password: "123456",
      phone: "4899999999",
      cep: "88813581",
      address: "Rua Antonio José Olímpio",
    });

    const response = await request(app.server).post("/sessions").send({
      email: "org@test.com",
      password: "123456",
    });

    expect(response.statusCode).toEqual(200);
    expect(response.body).toEqual({
      token: expect.any(String),
    });
  });
});
