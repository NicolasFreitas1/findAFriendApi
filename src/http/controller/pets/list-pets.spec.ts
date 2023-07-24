import request from "supertest";
import { app } from "@/app";
import { afterEach, beforeAll, describe, expect, it } from "vitest";
import { createAndAuthenticateUser } from "@/utils/test/create-and-authenticate-org";

describe("List Pets By City(e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterEach(async () => {
    await app.close();
  });

  it("should be able to list pets by city", async () => {
    const { token } = await createAndAuthenticateUser(app);

    await request(app.server)
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
      });
      
    const response = await request(app.server)
      .get("/pets/Criciúma")

    expect(response.statusCode).toEqual(200);
  });
});
