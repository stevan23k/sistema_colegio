import { Router } from "express";
import { findNotas, createNotas } from "../controllers/notas.js";

const route = Router();

// rutas de notas
route.get("/notas", findNotas);
route.post("/create/notas", createNotas);

export default route;
