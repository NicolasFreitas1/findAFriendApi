import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found";
import { makeGetOrgProfileUseCase } from "@/use-cases/factories/org/make-get-org-profile-use-case";
import { makeGetPetDetailsUseCase } from "@/use-cases/factories/pet/make-get-pet-details";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function getPetDetails(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const validateListParamsSchema = z.object({
    petId: z.string(),
  });

  const { petId } = validateListParamsSchema.parse(request.params);

  const getPetDetails = makeGetPetDetailsUseCase();
  const orgProfileUseCase = makeGetOrgProfileUseCase();

  try {
    const { pet } = await getPetDetails.execute({ petId });
    const { org } = await orgProfileUseCase.execute({ orgId: pet.org_id });

    return reply
      .status(200)
      .send({ pet, org: { ...org, password_hash: undefined } });
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: error.message });
    }
  }
}
