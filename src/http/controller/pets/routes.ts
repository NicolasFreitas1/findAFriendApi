import { verifyJWT } from "@/http/middlewares/verify-jwt";
import { FastifyInstance } from "fastify";
import { register } from "./register";
import { getPetsByOrgId } from "./get-pets-by-org";
import { listPets } from "./list-pets";

export async function petsRoutes(app: FastifyInstance) {
  app.post("/pets", { onRequest: [verifyJWT] }, register);

  app.get("/org/pets", { onRequest: [verifyJWT] }, getPetsByOrgId);
  app.get("/pets/:city", { onRequest: [verifyJWT] }, listPets);
}
