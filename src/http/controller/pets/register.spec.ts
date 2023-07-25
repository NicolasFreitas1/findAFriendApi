import request from "supertest";
import { app } from "@/app";
import { afterEach, beforeAll, describe, expect, it } from "vitest";
import { createAndAuthenticateUser } from "@/utils/test/create-and-authenticate-org";

describe("Register Pets (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterEach(async () => {
    await app.close();
  });

  it("should be able to register a pet", async () => {
    const { token } = await createAndAuthenticateUser(app);

    const response = await request(app.server)
      .post("/pets")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Bob",
        description: "Bob is a dog",
        age: "BABY",
        size: "SMALL",
        energy_level: "HIGH",
        independence_level: "LOW",
        environment: "MEDIUM",
        adoption_requirements: ["Ambiente climatizado", "Muita comida"],
      });

    expect(response.statusCode).toEqual(201);
  });
});
