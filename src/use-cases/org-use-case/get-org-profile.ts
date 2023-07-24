import { OrgsRepository } from "@/repositories/orgs-repository";
import { Org } from "@prisma/client";
import { ResourceNotFoundError } from "../errors/resource-not-found";

interface GetOrgProfileUseCaseRequest {
  orgId: string;
}

interface GetOrgProfileUseCaseResponse {
  org: Org;
}

export class GetOrgProfileUseCase {
  constructor(private orgsRepository: OrgsRepository) {}

  async execute({
    orgId,
  }: GetOrgProfileUseCaseRequest): Promise<GetOrgProfileUseCaseResponse> {
    const org = await this.orgsRepository.findById(orgId);

    if (!org) throw new ResourceNotFoundError();

    return {
      org,
    };
  }
}
