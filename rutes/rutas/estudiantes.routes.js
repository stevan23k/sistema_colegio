import { Router } from "express";

import {
  findEstudiantes,
  createEstudiantes,
} from "../controllers/estudiantes.js";

const route = Router();

// rutas para estudiantes
route.get("/estudiantes", findEstudiantes);
route.post("/create/estudiantes", createEstudiantes);

export default route;
