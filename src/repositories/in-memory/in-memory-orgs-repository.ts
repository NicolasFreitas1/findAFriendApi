import { Prisma, Org } from "@prisma/client";
import { OrgsRepository } from "../orgs-repository";
import { randomUUID } from "node:crypto";

export class InMemoryOrgRepository implements OrgsRepository {
  public items: Org[] = [];

  async findByEmail(email: string) {
    const org = this.items.find((item) => item.email === email);

    if (!org) return null;
    
    return org;
  }

  async create(data: Prisma.OrgCreateInput) {
    const org = {
      id: randomUUID(),
      name: data.name,
      email: data.email,
      password_hash: data.password_hash,
      cep: data.cep,
      phone: data.phone,
      address: data.address,
      created_at: new Date(),
    };

    this.items.push(org);

    return org;
  }
}
