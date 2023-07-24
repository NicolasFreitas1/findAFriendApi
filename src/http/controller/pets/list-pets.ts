import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found";
import { makeListPetsUseCase } from "@/use-cases/factories/pet/make-list-pets-by-city";
import {
  Age,
  EnergyLevel,
  Environment,
  IndependenceLevel,
  Size,
} from "@prisma/client";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function listPets(request: FastifyRequest, reply: FastifyReply) {
  const validateListParamsSchema = z.object({
    city: z.string(),
  });

  const validateQueryParamsSchema = z.object({
    age: z.enum([Age.BABY, Age.YOUNG, Age.OLD]).optional(),
    size: z.enum([Size.SMALL, Size.MEDIUM, Size.BIG]).optional(),
    energy_level: z
      .enum([
        EnergyLevel.VERY_LOW,
        EnergyLevel.LOW,
        EnergyLevel.MEDIUM,
        EnergyLevel.HIGH,
        EnergyLevel.VERY_HIGH,
      ])
      .optional(),
    independence_level: z
      .enum([
        IndependenceLevel.LOW,
        IndependenceLevel.MEDIUM,
        IndependenceLevel.HIGH,
      ])
      .optional(),
    environment: z
      .enum([Environment.SMALL, Environment.MEDIUM, Environment.BIG])
      .optional(),
  });

  const { city } = validateListParamsSchema.parse(request.params);
  const data = validateQueryParamsSchema.parse(request.query);

  const listPetsUseCase = makeListPetsUseCase();
  try {
    const { pets } = await listPetsUseCase.execute({ city, data: { ...data } });

    return reply.status(200).send({
      pets,
    });
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: error.message });
    }
  }
}
