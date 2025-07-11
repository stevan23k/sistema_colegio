import {Materias} from "../../db/schemas/materias.js";

export const findMaterias = async (req, res) => {
    const materias = await Materias.find({}).populate("profesor").exec();
    res.status(200).json({materias});
};

export const deleteMaterias = async (req, res) => {
    const { idMateria } = req.params
    try {
        const materia = await Materias.findById(idMateria);
        if (! materia) {
            return res.status(404).json({mensaje: "Materia no encontrada"});
        }
        await materia.remove();
        res.status(200).json({mensaje: "Materia eliminada con exito"});
    } catch (error) {
        res.status(500).json({mensaje: "Error al eliminar materia", error});
    }
}

export const addProfesor = async (req, res) => {
    const {idMateria} = req.params;
    const {idProfesor} = req.body;

    const materia = await Materias.findById(idMateria);

    if (! materia) {
        return res.status(404).json({mensaje: "Materia no encontrada"});
    }
    if (materia.profesor) {
        return res.status(400).json({mensaje: "Materia ya tiene un profesor"});
    }
    if (materia.profesor === idProfesor) {
        return res.status(400).json({mensaje: "profesor ya agregado a esta materia"});
    }

    materia.profesor = idProfesor;
    await materia.save();

    res.status(200).json({mensaje: "Profesor agregado con exito"});
};

export const deleteProfesor = async (req, res) => {
    const {idMateria} = req.params
    const materia = await Materias.findById(idMateria);

    if (! materia) {
        return res.status(404).json({mensaje: "Materia no encontrada"});
    }
    if (!materia.profesor){
        return res.status(400).json({mensaje: "Materia no tiene un profesor"});
    }

    materia.profesor = null;
    await materia.save();

    res.status(200).json({
        mensaje: "Profesor eliminado con exito",
        "materia": materia
    });
}

export const findMateriaById = async (req, res) => {
    const {nombre} = req.params;

    const materia = await Materias.findOne({nombre}).populate("profesor").exec();
    res.status(200).json({materia});
};

export const createMaterias = async (req, res) => {
    const {nombre, profesor} = req.body;
    const materia = new Materias({nombre, profesor});

    const newMateria = await materia.save();
    res.status(201).json({mensaje: "materia creada con exito", materia: newMateria});
};
