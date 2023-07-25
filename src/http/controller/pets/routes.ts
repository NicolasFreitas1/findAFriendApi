import { verifyJWT } from "@/http/middlewares/verify-jwt";
import { FastifyInstance } from "fastify";
import { register } from "./register";
import { getPetsByOrgId } from "./get-pets-by-org";
import { listPets } from "./list-pets";
import { getPetDetails } from "./get-pet-details";
import multer from "fastify-multer";

const upload = multer({ dest: "uploads/" });

export async function petsRoutes(app: FastifyInstance) {
  app.post(
    "/pets",
    { onRequest: [verifyJWT], preHandler: upload.array("images", 6) },
    register
  );

  app.get("/pets/details/:petId", getPetDetails);
  app.get("/pets/:city", listPets);
  app.get("/pets/org", { onRequest: [verifyJWT] }, getPetsByOrgId);
}
