import { Router } from "express";
import { saludo } from "./ruta_saludo.js";

const route = Router();

route.get("/hola", saludo);

export default route;
