import mongoose from "mongoose";

const matariaSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
  profesor: {
    type: mongoose.Types.ObjectId,
  },
});

export const Materias = mongoose.model("Materias", matariaSchema);
