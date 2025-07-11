import { Router } from "express";
import {
  findMaterias,
  createMaterias,
  findMateriaById,
  addProfesor,
  deleteProfesor,
  deleteMaterias

} from "../controllers/materias.js";

const route = Router();
// rutas de materias
route.get("/materias", findMaterias);
route.get("/materias/:nombre", findMateriaById);
// crear
route.post("/create/materias", createMaterias);
// agregar
route.post("/materias/addProfesor/:idMateria", addProfesor);
// eliminar
route.delete("/materias/deleteProfesor/:idMateria", deleteProfesor)
// eliminar
route.delete("/materias/delete/:idMateria", deleteMaterias)

export default route;
