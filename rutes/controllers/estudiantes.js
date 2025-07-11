import { Estudiantes } from "../../db/schemas/estudiantes.js";
import { Cursos } from "../../db/schemas/cursos.js";

function calcularEdad(fecha_nacimiento) {
  const hoy = new Date();
  const nacimiento = new Date(fecha_nacimiento);

  let edad = hoy.getFullYear() - nacimiento.getFullYear();
  const mes = hoy.getMonth() - nacimiento.getMonth();

  // Si aún no ha cumplido años este año, resta uno
  if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
    edad--;
  }

  return edad;
}

export const findEstudiantes = async (req, res) => {
  try {
    const estudiantes = await Estudiantes.find({})
      .populate("curso", "nombre")
      .exec();

    // Añadir edad a cada estudiante
    const estudiantesConEdad = estudiantes.map((est) => ({
      ...est.toObject(),
      edad: calcularEdad(est.fecha_nacimiento),
    }));

    res.status(200).json({ estudiantes: estudiantesConEdad });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener estudiantes", error });
  }
};

export const editEstudiantes = async (req, res) => {
  const { idEstudiante } = req.params;
  const { nombres, apellidos, fecha_nacimiento, curso } = req.body;

  try {
    const estudiante = await Estudiantes.findById(idEstudiante);

    estudiante.nombres = nombres ?? estudiante.nombres;
    estudiante.apellidos = apellidos ?? estudiante.apellidos;
    estudiante.fecha_nacimiento =
      fecha_nacimiento ?? estudiante.fecha_nacimiento;
    estudiante.curso = curso ?? estudiante.curso;

    await estudiante.save();
    res.status(200).json({
      mensaje: "Estudiante editado con éxito",
      estudiante,
    });
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al editar el estudiante",
      error,
    });
  }
};

export const createEstudiantes = async (req, res) => {
  const { nombres, apellidos, fecha_nacimiento, curso } = req.body;
  try {
    const estudiante = new Estudiantes({
      nombres,
      apellidos,
      fecha_nacimiento,
      curso,
    });
    const newEstudiante = await estudiante.save();
    res.status(201).json({
      mensaje: "estudiante creado con exito",
      estudiante: newEstudiante,
    });
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al crear el estudiante",
      error,
    });
  }
};
export const deleteEstudiantes = async (req, res) => {
  const { idEstudiante } = req.params;

  try {
    const estudiante = await Estudiantes.findByIdAndDelete(idEstudiante);
    res.status(200).json({
      mensaje: "Estudiante eliminado con éxito",
      estudiante,
    });
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al eliminar el estudiante",
      error,
    });
  }
};

export const addCurso = async (req, res) => {
  const { idEstudiante } = req.params;
  const { idCurso } = req.body;

  try {
    const estudiante = await Estudiantes.findById(idEstudiante);
    const curso = await Cursos.findById(idCurso);

    if (estudiante.curso) {
      return res.status(400).json({
        mensaje: "El estudiante ya está inscrito en un curso",
      });
    }

    estudiante.curso = idCurso;
    curso.estudiantes.push(idEstudiante);
    await estudiante.save();
    await curso.save();

    res.status(200).json({
      mensaje: "Curso añadido al estudiante con éxito",
      curso: curso,
      estudiante: estudiante,
    });
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al añadir el curso al estudiante",
      error,
    });
  }
};
