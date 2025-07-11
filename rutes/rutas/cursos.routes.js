import { Router } from "express";

import {
  createCursos,
  findCursos,
  agregarEstudiantes,
  agregarDirector,
  deleteDirector,
  deleteEstudiante,
  addMaterias,
  deleteMaterias,
  editCursos,
} from "../controllers/cursos.js";

const route = Router();

// buscar cursos
route.get("/cursos", findCursos);

// crear cursos
route.post("/create/cursos", createCursos);

// agreagar
route.post("/cursos/addEstudiante/:idCurso", agregarEstudiantes);
route.post("/cursos/addDirector/:idCurso", agregarDirector);
route.post("/cursos/addMateria/:idCurso", addMaterias);

// eliminar
route.delete("/cursos/deleteDirector/:idCurso", deleteDirector);
route.delete("/cursos/deleteEstudiante/:idCurso", deleteEstudiante);
route.delete("/cursos/deleteMateria/:idCurso", deleteMaterias);

// editar
route.put("/cursos/edit/:idCurso", editCursos);

export default route;
