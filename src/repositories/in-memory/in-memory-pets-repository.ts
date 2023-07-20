import { Pet, Prisma } from "@prisma/client";
import { PetsRepository } from "../pets-repository";
import { randomUUID } from "crypto";

export class InMemoryPetRepository implements PetsRepository {
  public items: Pet[] = [];

  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = {
      id: randomUUID(),
      name: data.name,
      description: data.description,
      age: data.age,
      size: data.size,
      energy_level: data.energy_level,
      independence_level: data.independence_level,
      environment: data.environment,
      org_id: data.org_id,
      created_at: new Date(),
    };

    this.items.push(pet);

    return pet;

    // id              String         @id @default(uuid())
    // name            String
    // description     String
    // age             Age
    // size            Size
    // energy_level    EnergyLevel
    // indepence_level IndepenceLevel
    // environment     Environment
    // created_at      DateTime       @default(now())
  }
}
