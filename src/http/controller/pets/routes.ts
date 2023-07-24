import { verifyJWT } from "@/http/middlewares/verify-jwt";
import { FastifyInstance } from "fastify";
import { register } from "./register";
import { getPetsByOrgId } from "./get-pets-by-org";
import { listPets } from "./list-pets";
import { getPetDetails } from "./get-pet-details";

export async function petsRoutes(app: FastifyInstance) {
  app.post("/pets", { onRequest: [verifyJWT] }, register);

  app.get("/pets/details/:petId", getPetDetails);
  app.get("/pets/:city", listPets);
  app.get("/pets/org", { onRequest: [verifyJWT] }, getPetsByOrgId);
}
