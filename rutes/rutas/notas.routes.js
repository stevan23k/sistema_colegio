import { Router } from "express";
import { findNotas, createNotas, addNota, eliminarNota } from "../controllers/notas.js";

const route = Router();

// rutas de notas
// buscar
route.get("/notas", findNotas);
// crear
route.post("/notas/create", createNotas);
// agregar 
route.post("/notas/addNotas/:idNota", addNota);
// eliminar
route.delete("/notas/deleteNota/:idNota", eliminarNota);

export default route;