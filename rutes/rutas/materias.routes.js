import { Router } from "express";
import {
  findMaterias,
  createMaterias,
  findMateriaById,
  addProfesor,
  deleteProfesor,
  deleteMaterias
} from "../controllers/materias.js";

const route = Router();

/**
 * @swagger
 * components:
 *  schemas:
 *      Materia:
 *          type: object
 *          properties:
 *              _id:
 *                  type: string
 *                  description: ID único de la materia
 *              nombre:
 *                  type: string
 *                  description: Nombre de la materia
 *              profesor:
 *                  type: object
 *                  properties:
 *                      _id:
 *                          type: string
 *                      nombres:
 *                          type: string
 *                      apellidos:
 *                          type: string
 *                  description: Información del profesor asignado (opcional)
 *              __v:
 *                  type: number
 *                  description: Versión del documento
 *          example:
 *              _id: 60d21b4667d0d8992e610c85
 *              nombre: "Matemáticas Avanzadas"
 *              profesor: { _id: "60d21b4667d0d8992e610c86", nombres: "Juan", apellidos: "Pérez" }
 *              __v: 0
 *
 *  parameters:
 *      materiaId:
 *          in: path
 *          name: idMateria
 *          required: true
 *          schema:
 *              type: string
 *          description: ID de la materia
 *
 *  requestBodies:
 *      MateriaBody:
 *          description: Datos de la materia
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          nombre:
 *                              type: string
 *                              description: Nombre de la materia
 *                              example: "Matemáticas Avanzadas"
 *                          profesor:
 *                              type: string
 *                              description: ID del profesor a asignar (opcional)
 *                              example: "60d21b4667d0d8992e610c86"
 */

/**
 * @swagger
 * tags:
 *  name: Materias
 *  description: Endpoints para el manejo de materias académicas
 */

/**
 * @swagger
 * /materias:
 *  get:
 *      summary: Obtiene todas las materias con información de profesores
 *      tags: [Materias]
 *      responses:
 *          200:
 *              description: Lista de materias
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              materias:
 *                                  type: array
 *                                  items:
 *                                      $ref: '#/components/schemas/Materia'
 *          500:
 *              description: Error del servidor
 */
route.get("/materias", findMaterias);

/**
 * @swagger
 * /materias/{nombre}:
 *  get:
 *      summary: Busca una materia por su nombre
 *      tags: [Materias]
 *      parameters:
 *          - in: path
 *            name: nombre
 *            required: true
 *            schema:
 *                type: string
 *            description: Nombre de la materia a buscar
 *      responses:
 *          200:
 *              description: Información de la materia
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Materia'
 *          404:
 *              description: Materia no encontrada
 *          500:
 *              description: Error del servidor
 */
route.get("/materias/:nombre", findMateriaById);

/**
 * @swagger
 * /create/materias:
 *  post:
 *      summary: Crea una nueva materia
 *      tags: [Materias]
 *      requestBody:
 *          $ref: '#/components/requestBodies/MateriaBody'
 *      responses:
 *          201:
 *              description: Materia creada exitosamente
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Materia'
 *          400:
 *              description: Error en la solicitud
 *          500:
 *              description: Error del servidor
 */
route.post("/create/materias", createMaterias);

/**
 * @swagger
 * /materias/addProfesor/{idMateria}:
 *  post:
 *      summary: Asigna un profesor a una materia
 *      tags: [Materias]
 *      parameters:
 *          - $ref: '#/components/parameters/materiaId'
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          idProfesor:
 *                              type: string
 *                              description: ID del profesor a asignar
 *                              example: "60d21b4667d0d8992e610c86"
 *      responses:
 *          200:
 *              description: Profesor asignado exitosamente
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Materia'
 *          400:
 *              description: Error en la solicitud
 *          404:
 *              description: Materia o profesor no encontrado
 *          500:
 *              description: Error del servidor
 */
route.post("/materias/addProfesor/:idMateria", addProfesor);

/**
 * @swagger
 * /materias/deleteProfesor/{idMateria}:
 *  delete:
 *      summary: Elimina la asignación de un profesor a una materia
 *      tags: [Materias]
 *      parameters:
 *          - $ref: '#/components/parameters/materiaId'
 *      responses:
 *          200:
 *              description: Profesor eliminado de la materia exitosamente
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Materia'
 *          404:
 *              description: Materia no encontrada o sin profesor asignado
 *          500:
 *              description: Error del servidor
 */
route.delete("/materias/deleteProfesor/:idMateria", deleteProfesor);

/**
 * @swagger
 * /materias/delete/{idMateria}:
 *  delete:
 *      summary: Elimina una materia
 *      tags: [Materias]
 *      parameters:
 *          - $ref: '#/components/parameters/materiaId'
 *      responses:
 *          200:
 *              description: Materia eliminada exitosamente
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              mensaje:
 *                                  type: string
 *                                  example: Materia eliminada con exito
 *          404:
 *              description: Materia no encontrada
 *          500:
 *              description: Error del servidor
 */
route.delete("/materias/delete/:idMateria", deleteMaterias);

export default route;
