import { Router } from "express";
import {
  findMaterias,
  createMaterias,
  findMateriaById,
} from "../controllers/materias.js";

const route = Router();
// rutas de materias
route.get("/materias", findMaterias);
route.post("/create/materias", createMaterias);
route.get("/materias/:nombre", findMateriaById);

export default route;
