import { Notas } from "../../db/schemas/notas.js";

export const findNotas = async (req, res) => {
  const notas = await Notas.find({})
    .populate("estudiante", "nombres")
    .populate("materia", "nombre")
    .exec();
  res.status(200).json({ notas });
};

export const createNotas = async (req, res) => {
  const { materia, estudiante, nota } = req.body;
  const notas = new Notas({ materia, estudiante, nota });
  const newNotas = await notas.save();

  res.status(201).json({ mensaje: "Nota creadas con éxito", notas: newNotas });
};
