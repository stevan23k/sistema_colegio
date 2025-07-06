import { Router } from "express";

import { findProfesores, createProfesores } from "../controllers/profesores.js";

const route = Router();
// rutas para profesores
route.post("/create/profesores", createProfesores);
route.get("/profesores", findProfesores);

export default route;
