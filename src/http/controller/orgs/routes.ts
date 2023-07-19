import { FastifyInstance } from "fastify";
import { register } from "./register";
import { authenticate } from "./authenticate";

export async function orgsRoutes(app: FastifyInstance) {
  app.post("/org", register);
  app.post("/session", authenticate);
}
