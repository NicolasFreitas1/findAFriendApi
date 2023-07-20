import { PrismaOrgRepository } from "@/repositories/prisma/prisma-orgs-repository";
import { GetOrgProfileUseCase } from "../get-org-profile";

export function makeGetOrgProfileUseCase() {
  const orgsRepository = new PrismaOrgRepository();
  const getOrgProfileUseCase = new GetOrgProfileUseCase(orgsRepository);

  return getOrgProfileUseCase;
}
