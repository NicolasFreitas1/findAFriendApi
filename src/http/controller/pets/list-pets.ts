import { makeListPetsUseCase } from "@/use-cases/factories/pet/make-list-pets-by-city";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function listPets(request: FastifyRequest, reply: FastifyReply) {
  await request.jwtVerify();

  const validateListParamsSchema = z.object({
    city: z.string(),
  });

  const { city } = validateListParamsSchema.parse(request.params);

  const listPetsUseCase = makeListPetsUseCase();

  const pets = await listPetsUseCase.execute({ city });

  return reply.status(200).send({
    pets,
  });
}
