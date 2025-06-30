import mongoose from "mongoose";

const ProfesorSchema = new mongoose.Schema({
  nombres: {
    type: String,
    required: true,
  },
  apellidos: {
    type: String,
    required: true,
  },
});

export const Profesores = mongoose.model("Profesores", ProfesorSchema);
