import mongoose from "mongoose";

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("mongo se ha conectado correctamente"))
  .catch((err) => console.error(err));
