import mongoose from "mongoose";

const estudianteSchema = new mongoose.Schema({
  nombres: {
    type: String,
    minlength: 3,
    required: true,
  },
  apellidos: {
    type: String,
    minlength: 3,
    required: true,
  },
  edad: {
    type: Number,
    required: true,
  },
  curso: {
    type: mongoose.Types.ObjectId,
    ref: "Cursos",
  },
});

export const Estudiantes = mongoose.model("Estudiantes", estudianteSchema);
