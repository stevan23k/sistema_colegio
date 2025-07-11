import "./db/database.js";
import cursosRoute from "./rutes/rutas/cursos.routes.js";
import estudiantesRoute from "./rutes/rutas/estudiantes.routes.js";
import materiasRoute from "./rutes/rutas/materias.routes.js";
import profesoresRoute from "./rutes/rutas/profesores.routes.js";
import notasRoute from "./rutes/rutas/notas.routes.js";
import express from "express";
import swaggerUI from "swagger-ui-express";
import specs from "./swagger/swagger.js";

const app = express();
app.use(express.json());
app.use("/docs",swaggerUI.serve, swaggerUI.setup(specs))

app.use(cursosRoute);
app.use(materiasRoute);
app.use(estudiantesRoute);
app.use(profesoresRoute);
app.use(notasRoute);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`servidor corriendo en ${port}`);
});
