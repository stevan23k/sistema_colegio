import { Cursos } from "../../db/schemas/cursos.js";
import { Estudiantes } from "../../db/schemas/estudiantes.js";
import { Profesores } from "../../db/schemas/profesores.js";
import { Materias } from "../../db/schemas/materias.js";

export const findCursos = async (req, res) => {
  try {
    const cursos = await Cursos.find({})
      .populate("estudiantes", "nombres")
      .populate("director", "nombres")
      .populate("materias", "nombre")
      .exec();
    res.status(200).json({ cursos });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener los cursos", error });
  }
};

export const addMaterias = async (req, res) => {
  const { idCurso } = req.params;
  const { idMateria } = req.body;

  try {
    const curso = await Cursos.findById(idCurso);
    const materia = await Materias.findById(idMateria);

    if (curso.materias.includes(idMateria)) {
      return res.status(400).json({
        mensaje: "La materia ya está asignada a este curso",
      });
    }

    curso.materias.push(idMateria);
    curso.save();

    res.status(200).json({
      mensaje: "materia agregada con exito",
      materia: materia.nombre,
      curso: curso.nombre,
    });
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al agregar materia al curso",
      error,
    });
  }
};

export const deleteMaterias = async (req, res) => {
  const { idCurso } = req.params;
  const { idMateria } = req.body;

  try {
    const curso = await Cursos.findById(idCurso);
    const materia = await Materias.findById(idMateria);

    if (!curso.materias.includes(idMateria)) {
      return res.status(400).json({
        mensaje: "La materia no está asignada a este curso",
      });
    }

    curso.materias = curso.materias.filter((id) => id.toString() !== idMateria);
    curso.save();
    res.status(200).json({
      mensaje: "Materia eliminada con exito",
      materia: materia.nombre,
      curso: curso.nombre,
    });
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al eliminar materia del curso",
      error,
    });
  }
};

export const agregarEstudiantes = async (req, res) => {
  const idCurso = req.params;
  const idEstudiante = req.body;
  const curso = await Cursos.findById(idCurso);
  const estudiante = await Estudiantes.findById(idEstudiante);

  try {
    if (!curso.estudiantes.includes(idEstudiante)) {
      curso.estudiantes.push(idEstudiante);
      estudiante.curso = idCurso;
    }
    await curso.save();
    await estudiante.save();
    res.status(200).json({
      mensaje: "Estudiante agregado con exito",
      estudiante: estudiante,
      curso: curso,
    });
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al agregar estudiante al curso",
      error,
    });
  }
};

export const deleteEstudiante = async (req, res) => {
  const idCurso = req.params;
  const idEstudiante = req.body;

  const curso = await Cursos.findById(idCurso);
  const estudiante = await Estudiantes.findById(idEstudiante);

  try {
    if (curso.estudiantes.length === 0) {
      return res.status(400).json({
        mensaje: "El curso no tiene estudiantes",
      });
    }

    if (!curso.estudiantes.includes(idEstudiante)) {
      return res.status(400).json({
        mensaje: "El estudiante no está inscrito en este curso",
      });
    }

    curso.estudiantes = curso.estudiantes.filter(
      (id) => id.toString() !== idEstudiante,
    );
    estudiante.curso = null;
    curso.save();
    estudiante.save();

    res.status(200).json({
      mensaje: "Estudiante eliminado con exito",
      estudiante: estudiante.nombres,
      curso: curso.nombre,
    });
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al eliminar estudiante del curso",
      error,
    });
  }
};

export const agregarDirector = async (req, res) => {
  const idCurso = req.params;
  const idDirector = req.body;

  const curso = await Cursos.findById(idCurso);
  const director = await Profesores.findById(idDirector);

  try {
    if (curso.director) {
      return res.status(400).json({
        mensaje: "El curso ya tiene un director asignado",
      });
    }

    curso.director = idDirector;
    curso.save();

    res.status(200).json({
      mensaje: "director asignado con exito",
      director,
      curso,
    });
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al asignar director al curso",
      error,
    });
  }
};

export const deleteDirector = async (req, res) => {
  const idCurso = req.params;

  const curso = await Cursos.findById(idCurso);

  try {
    if (curso.director === null) {
      return res.status(400).json({
        mensaje: "El curso no tiene un director asignado",
      });
    }
    curso.director = null;
    curso.save();
    res.status(200).json({
      mensaje: "director eliminado con exito",
      curso: curso.director,
    });
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al eliminar director del curso",
      error,
    });
  }
};

export const createCursos = async (req, res) => {
  const { nombre, estudiantes, director, materias } = req.body;
  const año = new Date().getFullYear();
  try {
    const cursos = new Cursos({
      nombre,
      estudiantes,
      director,
      materias,
      año,
    });
    const newCursos = await cursos.save();
    res
      .status(201)
      .json({ mensaje: "curso creado con exito", curso: newCursos });
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al crear el curso",
      error,
    });
  }
};
