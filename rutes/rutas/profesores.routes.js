import {Router} from "express";

import {findProfesores, createProfesores, findProfesoresByNames, deleteProfesores, editProfesores} from "../controllers/profesores.js";

const route = Router();
// crear
route.post("/create/profesores", createProfesores);
// buscar
route.get("/profesores", findProfesores);
route.get("/profesores/:nombre", findProfesoresByNames)
// eliminar
route.delete("/profesores/delete/:idProfesor", deleteProfesores)
// editar
route.put("/profesores/edit/:idProfesor", editProfesores)
export default route;
