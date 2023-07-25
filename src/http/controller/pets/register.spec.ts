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
      .field("name", "Bob")
      .field("description", "Bob is a dog")
      .field("age", "BABY")
      .field("energy_level", "HIGH")
      .field("size", "SMALL")
      .field("independence_level", "LOW")
      .field("environment", "MEDIUM")
      .field(
        "adoption_requirements",
        JSON.stringify(["Requirement 1", "Requirement 2", "Requirement 3"])
      )
      .attach("images", "/uploads/Screenshot_8.png");

    expect(response.statusCode).toEqual(201);
  });
});
