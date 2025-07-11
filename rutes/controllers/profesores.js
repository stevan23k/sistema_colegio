import {Profesores} from "../../db/schemas/profesores.js";

export const findProfesores = async (req, res) => {
    const profesores = await Profesores.find({});
    res.status(200).json({profesores});
};

export const findProfesoresByNames = async (req, res) => {
    const {nombre} = req.params;
    try { // Crear una expresión regular que busque coincidencias parciales sin importar mayúsculas/minúsculas
        const searchRegex = new RegExp(nombre, 'i');

        // Buscar en nombres o apellidos que coincidan con el término de búsqueda
        const profesores = await Profesores.find({
            $or: [
                {
                    nombres: {
                        $regex: searchRegex
                    }
                }, {
                    apellidos: {
                        $regex: searchRegex
                    }
                }
            ]
        });

        res.status(200).json({profesores});
    } catch (error) {
        console.error('Error al buscar profesores:', error);
        res.status(500).json({mensaje: "Error al buscar profesores", error: error.message});
    }
};

export const deleteProfesores = async (req, res) => {
    const {idProfesor} = req.params
    try {
        const profesor = await Profesores.findById(idProfesor);
        if (! profesor) {
            return res.status(404).json({mensaje: "Profesor no encontrado"})
        }
        await profesor.remove();
        res.status(200).json({mensaje: "Profesor eliminado con exito"})
    } catch (error) {
        res.status(500).json({mensaje: "Error al eliminar profesor", error})
    }
}

export const editProfesores = async (req, res) =>{
  const { idProfesor } = req.params
  const { nombres, apellidos } = req.body

  try {
    const profesor = await Profesores.findById(idProfesor);
    if (! profesor) {
      return res.status(404).json({mensaje: "Profesor no encontrado"})
    }
    profesor.nombres = nombres ?? profesor.nombres;
    profesor.apellidos = apellidos ?? profesor.apellidos;
    await profesor.save();
    res.status(200).json({mensaje: "Profesor editado con exito", profesor})
  } catch(error) {
    res.status(500).json({mensaje: "Error al editar profesor", error})
  }
}

export const createProfesores = async (req, res) => {
    const {nombres, apellidos} = req.body;
    const profesor = new Profesores({nombres, apellidos});
    const newProfesor = await profesor.save();
    res.status(201).json({mensaje: "profesor creado con exito", profesor: newProfesor});
};
