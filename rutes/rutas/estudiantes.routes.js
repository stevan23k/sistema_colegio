import { Router } from "express";

import {
  findEstudiantes,
  createEstudiantes,
  editEstudiantes,
  deleteEstudiantes,
  addCurso,
} from "../controllers/estudiantes.js";

const route = Router();

// rutas para estudiantes
route.get("/estudiantes", findEstudiantes);
route.post("/estudiantes/create", createEstudiantes);
// editar estudiante
route.put("/estudiantes/edit/:idEstudiante", editEstudiantes);
route.delete("/estudiantes/delete/:idEstudiante", deleteEstudiantes);
// agregar
route.post("/estudiantes/addCurso/:idEstudiante", addCurso);

export default route;
