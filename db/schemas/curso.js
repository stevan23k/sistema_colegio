import mongoose from "mongoose";

const cursoSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
  estudiantes: [
    {
      type: Schema.Types.ObjectId,
      ref: "Estudiantes",
    },
  ],
  director: {
    type: mongoose.Types.ObjectId,
    ref: "Profesores",
  },
  materias: [
    {
      type: Schema.Types.ObjectId,
      ref: "Materias",
    },
  ],
});

export const Cursos = mongoose.model("Cursos", cursoSchema);
