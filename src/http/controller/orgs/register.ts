import { OrgAlreadyExistsError } from "@/use-cases/errors/org-already-exists";
import { makeRegisterOrgUseCase } from "@/use-cases/factories/make-register-org-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
    cep: z.string(),
    phone: z.string(),
    address: z.string(),
  });

  const { name, email, password, cep, address, phone } =
    registerBodySchema.parse(request.body);

  try {
    const registerOrgUseCase = makeRegisterOrgUseCase();

    await registerOrgUseCase.execute({
      name,
      email,
      password,
      cep,
      address,
      phone,
    });
  } catch (error) {
    if (error instanceof OrgAlreadyExistsError) {
      return reply.status(409).send({ message: error.message });
    }

    throw error;
  }

  return reply.status(201).send();
}
