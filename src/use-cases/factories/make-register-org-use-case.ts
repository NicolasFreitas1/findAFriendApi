import { PrismaOrgRepository } from "@/repositories/prisma/prisma-orgs-repository";
import { RegisterOrgUseCase } from "../register-org";

export function makeRegisterOrgUseCase() {
  const orgsRepository = new PrismaOrgRepository();
  const registerOrgUseCase = new RegisterOrgUseCase(orgsRepository);

  return registerOrgUseCase;
}
