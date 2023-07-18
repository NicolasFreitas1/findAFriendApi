import fastify from "fastify";
import { orgsRoutes } from "./http/controller/orgs/routes";
import { ZodError } from "zod";
import { env } from "./env";

export const app = fastify();

app.register(orgsRoutes);

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: "Validation error", issues: error.format() });
  }

  if (env.NODE_ENV !== "production") {
    console.error(error);
  } else {
    // TODO
  }

  return reply.status(500).send({ message: "Internal server error. " });
});