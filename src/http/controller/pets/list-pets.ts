import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found";
import { makeListPetsUseCase } from "@/use-cases/factories/pet/make-list-pets-by-city";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function listPets(request: FastifyRequest, reply: FastifyReply) {

  const validateListParamsSchema = z.object({
    city: z.string(),
  });

  const { city } = validateListParamsSchema.parse(request.params);

  const listPetsUseCase = makeListPetsUseCase();
  try {
    const pets = await listPetsUseCase.execute({ city });

    return reply.status(200).send({
      pets,
    });
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: error.message });
    }
  }
}
