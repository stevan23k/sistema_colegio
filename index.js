import "./db/database.js";
import { createClient } from "redis";
import express from "express";
import swaggerUI from "swagger-ui-express";
import specs from "./swagger/swagger.js";
import morgan from "morgan";

// redis
const redis = createClient()
redis.on("error", (err) => console.log("Redis Client Error", err));
redis.connect()
export default redis


// controllers
import cursosRoute from "./rutes/rutas/cursos.routes.js";
import estudiantesRoute from "./rutes/rutas/estudiantes.routes.js";
import materiasRoute from "./rutes/rutas/materias.routes.js";
import profesoresRoute from "./rutes/rutas/profesores.routes.js";
import notasRoute from "./rutes/rutas/notas.routes.js";
const app = express();

// middlewares
app.use(morgan("tiny"))
app.use(express.json());
app.use("/docs", swaggerUI.serve, swaggerUI.setup(specs))

// rutas
app.use(cursosRoute);
app.use(materiasRoute);
app.use(estudiantesRoute);
app.use(profesoresRoute);
app.use(notasRoute);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`servidor corriendo en ${port}`);
});
