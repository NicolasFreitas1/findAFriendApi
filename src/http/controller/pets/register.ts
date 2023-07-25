import { OrgAlreadyExistsError } from "@/use-cases/errors/org-already-exists";
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found";
import { makeCreateAdoptionRequirementsUseCase } from "@/use-cases/factories/adoption-requirements/make-create-adoption-requirements";
import { makeRegisterPetUseCase } from "@/use-cases/factories/pet/make-register-pet";
import {
  Age,
  EnergyLevel,
  Environment,
  IndependenceLevel,
  Size,
} from "@prisma/client";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function register(request: FastifyRequest, reply: FastifyReply) {
  await request.jwtVerify();

  const registerBodySchema = z.object({
    name: z.string(),
    description: z.string(),
    age: z.enum([Age.BABY, Age.YOUNG, Age.OLD]),
    size: z.enum([Size.SMALL, Size.MEDIUM, Size.BIG]),
    energy_level: z.enum([
      EnergyLevel.VERY_LOW,
      EnergyLevel.LOW,
      EnergyLevel.MEDIUM,
      EnergyLevel.HIGH,
      EnergyLevel.VERY_HIGH,
    ]),
    independence_level: z.enum([
      IndependenceLevel.LOW,
      IndependenceLevel.MEDIUM,
      IndependenceLevel.HIGH,
    ]),
    environment: z.enum([
      Environment.SMALL,
      Environment.MEDIUM,
      Environment.BIG,
    ]),
    adoption_requirements: z.string().array(),
  });

  const {
    name,
    description,
    age,
    size,
    energy_level,
    independence_level,
    environment,
    adoption_requirements,
  } = registerBodySchema.parse(request.body);

  const org_id = request.user.sub;
  try {
    const registerPetUseCase = makeRegisterPetUseCase();
    const createAdoptionRequirementsRequestUseCase =
      makeCreateAdoptionRequirementsUseCase();
    const { pet } = await registerPetUseCase.execute({
      name,
      description,
      age,
      size,
      energy_level,
      independence_level,
      environment,
      org_id,
    });

    for (const requirements of adoption_requirements) {
      await (
        await createAdoptionRequirementsRequestUseCase
      ).execute({ title: requirements, petId: pet.id });
    }

    return reply.status(201).send({ pet, adoption_requirements });
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: error.message });
    }

    throw error;
  }
}
