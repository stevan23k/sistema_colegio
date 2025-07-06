import { Profesores } from "../../db/schemas/profesores.js";

export const findProfesores = async (req, res) => {
  const profesores = await Profesores.find({});
  res.status(200).json({ profesores });
};

export const createProfesores = async (req, res) => {
  const { nombres, apellidos } = req.body;
  const estudiante = new Profesores({ nombres, apellidos });
  const newProfesor = await estudiante.save();
  res.status(201).json({
    mensaje: "profesor creado con exito",
    estudiante: newProfesor,
  });
};
