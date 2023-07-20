import { PrismaOrgRepository } from "@/repositories/prisma/prisma-orgs-repository";
import { AuthenticateOrgUseCase } from "../../org-use-case/authenticate-org";

export function makeAuthenticateOrgUseCase() {
  const orgsRepository = new PrismaOrgRepository();
  const authenticateOrgUseCase = new AuthenticateOrgUseCase(orgsRepository);

  return authenticateOrgUseCase;
}
