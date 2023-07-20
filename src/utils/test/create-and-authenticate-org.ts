import { prisma } from "@/lib/prisma";
import { hash } from "bcrypt";
import { FastifyInstance } from "fastify";
import request from "supertest";

export async function createAndAuthenticateUser(app: FastifyInstance) {
  const org = await prisma.org.create({
    data: {
      name: "Pet Org",
      email: "org@test.com",
      password_hash: await hash("123456", 6),
      phone: "4899999999",
      cep: "88813581",
      address: "Rua Antonio José Olímpio",
    },
  });

  const authResponse = await request(app.server).post("/sessions").send({
    email: "org@test.com",
    password: "123456",
  });

  const { token } = authResponse.body;

  return {
    token,
  };
}
