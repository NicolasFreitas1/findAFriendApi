import { PrismaOrgRepository } from "@/repositories/prisma/prisma-orgs-repository";
import { GetOrgProfileUseCase } from "../../org-use-case/get-org-profile";

export function makeGetOrgProfileUseCase() {
  const orgsRepository = new PrismaOrgRepository();
  const getOrgProfileUseCase = new GetOrgProfileUseCase(orgsRepository);

  return getOrgProfileUseCase;
}
