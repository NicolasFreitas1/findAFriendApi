import { PrismaOrgRepository } from "@/repositories/prisma/prisma-orgs-repository";
import { AuthenticateOrgUseCase } from "../authenticate-org";

export function makeAuthenticateOrgUseCase() {
  const orgsRepository = new PrismaOrgRepository();
  const authenticateOrgUseCase = new AuthenticateOrgUseCase(orgsRepository);

  return authenticateOrgUseCase;
}
