import { OrgsRepository } from "@/repositories/orgs-repository";
import { Org } from "@prisma/client";
import { hash } from "bcrypt";
import { OrgAlreadyExistsError } from "../errors/org-already-exists";

interface RegisterOrgUseCaseRequest {
  name: string;
  email: string;
  password: string;
  cep: string;
  phone: string;
  address: string;
}

interface RegisterOrgUseCaseResponse {
  org: Org;
}

export class RegisterOrgUseCase {
  constructor(private orgsRepository: OrgsRepository) {}

  async execute({
    name,
    email,
    password,
    cep,
    address,
    phone,
  }: RegisterOrgUseCaseRequest): Promise<RegisterOrgUseCaseResponse> {
    const password_hash = await hash(password, 6);

    const orgWithSameEmail = await this.orgsRepository.findByEmail(email);

    if (orgWithSameEmail) {
      throw new OrgAlreadyExistsError();
    }

    const org = await this.orgsRepository.create({
      name,
      email,
      password_hash,
      cep,
      phone,
      address,
    });

    return {
      org,
    };
  }
}
