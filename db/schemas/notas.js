import mongoose from "mongoose";

const notasSchema = new mongoose.Schema({
  materia: {
    type: mongoose.Types.ObjectId,
    ref: "Materias",
    required: true,
  },
  estudiante: {
    type: mongoose.Types.ObjectId,
    ref: "Estudiantes",
    required: true,
  },
  notas: [{
    type: Number,
    required: true,
  }],
  promedio: {
    type: Number,
  },
});

export const Notas = mongoose.model("Notas", notasSchema);
