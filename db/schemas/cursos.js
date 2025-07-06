import mongoose from "mongoose";

const cursoSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
  estudiantes: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Estudiantes",
    },
  ],
  director: {
    type: mongoose.Types.ObjectId,
    ref: "Profesores",
  },
  materias: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Materias",
    },
  ],
  año: {
    type: Date,
  },
});

export const Cursos = mongoose.model("Cursos", cursoSchema);
