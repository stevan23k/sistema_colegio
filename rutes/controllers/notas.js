import {Notas} from "../../db/schemas/notas.js";
import redis from "../../index.js";

export const findNotas = async (req, res) => {
    function PromedioNotas(notas) {
        const sum = notas.reduce((acumulador, nota) => acumulador + nota, 0);
        return sum / notas.length;
    }
    try {
    const notas = await Notas.find({}).populate("estudiante", "nombres").populate("materia", "nombre").exec();
    notas.forEach(nota => {
        nota.promedio = PromedioNotas(nota.notas);
    });
    res.status(200).json({notas});
    } catch (error) {
        res.status(500).json({mensaje: "Error al buscar notas", error});
    }
};

export const eliminarNota = async (req, res) => {
    const { idNota } = req.params;
    const { nNota } = req.body;

    try {
        const nota = await Notas.findById(idNota);
        if (! nota) {
            return res.status(404).json({mensaje: "Nota no encontrada"});
        }
        nota.notas = nota.notas.filter((nota, index) => index+1 !== nNota);
        await nota.save();
        redis.del("notas{}")
        res.status(200).json({mensaje: `Nota n eliminada con exito`, 
            nota,
            nNota,
        });
    } catch (error) {
        res.status(500).json({mensaje: "Error al eliminar nota", error});
    }
}

export const createNotas = async (req, res) => {
    const {idMateria, idEstudiante, notas} = req.body;
    const nota = new Notas({materia: idMateria, estudiante: idEstudiante, notas});
    const newNotas = await nota.save();

    redis.del("notas{}");
    res.status(201).json({mensaje: "Notas creadas con éxito", notas: newNotas});
};


export const addNota = async (req, res) => {
    const {idNota} = req.params;
    const {notas} = req.body;
    try {
        const nota = await Notas.findById(idNota);
        if (! nota) {
            return res.status(404).json({mensaje: "Nota no encontrada"});
        }
        nota.notas.push(notas);
        await nota.save();
        redis.del("notas{}");
        res.status(200).json({mensaje: "Nota agregada con exito"});
    } catch (error) {
        res.status(500).json({mensaje: "Error al agregar nota", error});
    }
}
