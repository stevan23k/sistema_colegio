import { Router } from "express";
import {
  findEstudiantes,
  createEstudiantes,
  editEstudiantes,
  deleteEstudiantes,
  addCurso,
} from "../controllers/estudiantes.js";
import cacheMiddleware from "../../middlewares/redis.js";

const route = Router();

/**
 * @swagger
 * components:
 *  schemas:
 *      Estudiante:
 *          type: object
 *          properties:
 *              _id:
 *                  type: string
 *                  description: ID único del estudiante
 *              nombres:
 *                  type: string
 *                  description: Nombres del estudiante
 *                  minLength: 3
 *              apellidos:
 *                  type: string
 *                  description: Apellidos del estudiante
 *                  minLength: 3
 *              fecha_nacimiento:
 *                  type: string
 *                  format: date
 *                  description: Fecha de nacimiento del estudiante (YYYY-MM-DD)
 *              curso:
 *                  type: object
 *                  properties:
 *                      _id:
 *                          type: string
 *                      nombre:
 *                          type: string
 *                  description: Información del curso al que pertenece (opcional)
 *              edad:
 *                  type: number
 *                  description: Edad calculada del estudiante
 *              __v:
 *                  type: number
 *                  description: Versión del documento
 *          example:
 *              _id: 60d21b4667d0d8992e610c85
 *              nombres: "Juan Carlos"
 *              apellidos: "Pérez López"
 *              fecha_nacimiento: "2005-07-15"
 *              curso: { _id: "60d21b4667d0d8992e610c86", nombre: "5to A" }
 *              edad: 18
 *              __v: 0
 *
 *  parameters:
 *      estudianteId:
 *          in: path
 *          name: idEstudiante
 *          required: true
 *          schema:
 *              type: string
 *          description: ID del estudiante
 *
 *  requestBodies:
 *      EstudianteBody:
 *          description: Datos del estudiante
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          nombres:
 *                              type: string
 *                              minLength: 3
 *                              example: "Juan Carlos"
 *                          apellidos:
 *                              type: string
 *                              minLength: 3
 *                              example: "Pérez López"
 *                          fecha_nacimiento:
 *                              type: string
 *                              format: date
 *                              example: "2005-07-15"
 *                          curso:
 *                              type: string
 *                              description: ID del curso (opcional)
 *                              example: "60d21b4667d0d8992e610c86"
 */

/**
 * @swagger
 * tags:
 *  name: Estudiantes
 *  description: Endpoints para el manejo de estudiantes
 */

/**
 * @swagger
 * /estudiantes:
 *  get:
 *      summary: Obtiene todos los estudiantes con información de sus cursos
 *      tags: [Estudiantes]
 *      responses:
 *          200:
 *              description: Lista de estudiantes con sus edades calculadas
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/Estudiante'
 *          500:
 *              description: Error del servidor
 */
route.get("/estudiantes", cacheMiddleware("estudiantes"), findEstudiantes);

/**
 * @swagger
 * /estudiantes/create:
 *  post:
 *      summary: Crea un nuevo estudiante
 *      tags: [Estudiantes]
 *      requestBody:
 *          $ref: '#/components/requestBodies/EstudianteBody'
 *      responses:
 *          201:
 *              description: Estudiante creado exitosamente
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Estudiante'
 *          400:
 *              description: Error de validación en los datos
 *          500:
 *              description: Error del servidor
 */
route.post("/estudiantes/create", createEstudiantes);

/**
 * @swagger
 * /estudiantes/edit/{idEstudiante}:
 *  put:
 *      summary: Actualiza la información de un estudiante
 *      tags: [Estudiantes]
 *      parameters:
 *          - $ref: '#/components/parameters/estudianteId'
 *      requestBody:
 *          $ref: '#/components/requestBodies/EstudianteBody'
 *      responses:
 *          200:
 *              description: Estudiante actualizado exitosamente
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Estudiante'
 *          400:
 *              description: Error de validación en los datos
 *          404:
 *              description: Estudiante no encontrado
 *          500:
 *              description: Error del servidor
 */
route.put("/estudiantes/edit/:idEstudiante", editEstudiantes);

/**
 * @swagger
 * /estudiantes/delete/{idEstudiante}:
 *  delete:
 *      summary: Elimina un estudiante
 *      tags: [Estudiantes]
 *      parameters:
 *          - $ref: '#/components/parameters/estudianteId'
 *      responses:
 *          200:
 *              description: Estudiante eliminado exitosamente
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              mensaje:
 *                                  type: string
 *                                  example: Estudiante eliminado correctamente
 *          404:
 *              description: Estudiante no encontrado
 *          500:
 *              description: Error del servidor
 */
route.delete("/estudiantes/delete/:idEstudiante", deleteEstudiantes);

/**
 * @swagger
 * /estudiantes/addCurso/{idEstudiante}:
 *  post:
 *      summary: Asigna un curso a un estudiante
 *      tags: [Estudiantes]
 *      parameters:
 *          - $ref: '#/components/parameters/estudianteId'
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          idCurso:
 *                              type: string
 *                              description: ID del curso a asignar
 *                              example: "60d21b4667d0d8992e610c86"
 *      responses:
 *          200:
 *              description: Curso asignado exitosamente
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Estudiante'
 *          400:
 *              description: Error en la solicitud
 *          404:
 *              description: Estudiante o curso no encontrado
 *          500:
 *              description: Error del servidor
 */
route.post("/estudiantes/addCurso/:idEstudiante", addCurso);

export default route;
