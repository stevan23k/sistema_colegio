import "./db/database.js";
import route from "./rutes/rutes.js";

import express from "express";

console.log(process.env.HOLA);

const app = express();
app.use(route);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`servidor corriendo en ${port}`);
});
