import mongoose from "mongoose";

const notasSchema = new mongoose.Schema({
  materia: {
    type: mongoose.Types.ObjectId,
    ref: "Materias",
    required: true,
  },
  estudiante: {
    type: mongoose.Types.ObjectId,
  },
});

export const Notas = mongoose.model("Notas", notasSchema);
