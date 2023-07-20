import { makeGetOrgProfileUseCase } from "@/use-cases/factories/make-get-org-profile-use-case";
import { FastifyReply, FastifyRequest } from "fastify";

export async function profile(request: FastifyRequest, reply: FastifyReply) {
  await request.jwtVerify();

  const getOrgProfile = makeGetOrgProfileUseCase();

  const { org } = await getOrgProfile.execute({ orgId: request.user.sub });

  return reply.status(200).send({
    org: {
      ...org,
      password_hash: undefined,
    },
  });
}
