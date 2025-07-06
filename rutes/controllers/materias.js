import { Materias } from "../../db/schemas/materias.js";

export const findMaterias = async (req, res) => {
  const materias = await Materias.find({}).populate("profesor").exec();
  res.status(200).json({ materias });
};

export const findMateriaById = async (req, res) => {
  const { nombre } = req.params;
  const materia = await Materias.findOne({ nombre })
    .populate("profesor")
    .exec();
  res.status(200).json({ materia });
};

export const createMaterias = async (req, res) => {
  const { nombre, profesor } = req.body;
  const materia = new Materias({ nombre, profesor });

  const newMateria = await materia.save();
  res
    .status(201)
    .json({ mensaje: "materia creada con exito", materia: newMateria });
};
