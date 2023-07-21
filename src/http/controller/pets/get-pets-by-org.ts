import { makeGetPetsByOrgIdUseCase } from "@/use-cases/factories/pet/make-get-pets-by-org-id";
import { FastifyReply, FastifyRequest } from "fastify";

export async function getPetsByOrgId(
  request: FastifyRequest,
  reply: FastifyReply
) {
  await request.jwtVerify();

  const orgId = request.user.sub;

  const registerPetUseCase = makeGetPetsByOrgIdUseCase();

  const { pets } = await registerPetUseCase.execute({ orgId });

  return reply.status(200).send({ pets });
}
