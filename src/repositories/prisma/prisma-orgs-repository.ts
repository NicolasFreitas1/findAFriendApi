import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { OrgsRepository } from "../orgs-repository";

export class PrismaOrgRepository implements OrgsRepository {
  async findById(id: string) {
    const org = await prisma.org.findUnique({
      where: {
        id: id,
      },
    });

    return org;
  }

  async findByEmail(email: string) {
    const org = await prisma.org.findUnique({
      where: {
        email,
      },
    });
    return org;
  }

  async create(data: Prisma.OrgCreateInput) {
    const org = await prisma.org.create({
      data,
    });

    return org;
  }
}
