import { Estudiantes } from "../../db/schemas/estudiantes.js";

export const findEstudiantes = async (req, res) => {
  const estudiantes = await Estudiantes.find({})
    .populate("curso", "nombre")
    .exec();
  res.status(200).json({ estudiantes });
};

export const createEstudiantes = async (req, res) => {
  const { nombres, apellidos, edad, curso } = req.body;
  const estudiante = new Estudiantes({ nombres, apellidos, edad, curso });
  const newEstudiante = await estudiante.save();
  res.status(201).json({
    mensaje: "estudiante creado con exito",
    estudiante: newEstudiante,
  });
};
