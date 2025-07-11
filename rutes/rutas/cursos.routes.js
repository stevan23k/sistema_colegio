import {Router} from "express";
import {
    createCursos,
    findCursos,
    agregarEstudiantes,
    agregarDirector,
    deleteDirector,
    deleteEstudiante,
    addMaterias,
    deleteMaterias,
    editCursos
} from "../controllers/cursos.js";

const route = Router();

/**
 * @swagger
 * components:
 *  schemas:
 *      Curso:
 *          type: object
 *          properties:
 *              id:
 *                  type: string
 *                  description: ID único del curso
 *              nombre:
 *                  type: string
 *                  description: Nombre del curso ("5to A")
 *              año:
 *                  type: string
 *                  format: date
 *                  description: Año lectivo del curso (YYYY-MM-DD)
 *              estudiantes:
 *                  type: array
 *                  items:
 *                      type: object
 *                      properties:
 *                          id:
 *                              type: string
 *                          nombres:
 *                              type: string
 *                  description: Lista de estudiantes en el curso
 *              director:
 *                  type: object
 *                  properties:
 *                      _id:
 *                          type: string
 *                      nombres:
 *                          type: string
 *                      apellidos:
 *                          type: string
 *                  description: Profesor director del curso
 *              materias:
 *                  type: array
 *                  items:
 *                      type: object
 *                      properties:
 *                          _id:
 *                              type: string
 *                          nombre:
 *                              type: string
 *                  description: Lista de materias del curso
 *              __v:
 *                  type: number
 *                  description: Versión del documento
 *          example:
 *              _id: 60d21b4667d0d8992e610c85
 *              nombre: "5to A"
 *              año: "2025-01-01"
 *              estudiantes: [{ _id: "60d21b4667d0d8992e610c86" }]
 *              director: { _id: "60d21b4667d0d8992e610c87", nombres: "María", apellidos: "González" }
 *              materias: [{ _id: "60d21b4667d0d8992e610c88", nombre: "Matemáticas" }]
 *              __v: 0
 *
 *  parameters:
 *      cursoId:
 *          in: path
 *          name: idCurso
 *          required: true
 *          schema:
 *              type: string
 *          description: ID del curso
 *
 *  requestBodies:
 *      CursoBody:
 *          description: Datos del curso
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          nombre:
 *                              type: string
 *                              example: "5to A"
 *                          año:
 *                              type: string
 *                              format: date
 *                              example: "2025-01-01"
 */

/**
 * @swagger
 * tags:
 *  name: Cursos
 *  description: Endpoints para el manejo de cursos académicos
 */

/**
 * @swagger
 * /cursos:
 *  get:
 *      summary: Obtiene todos los cursos con sus estudiantes, director y materias
 *      tags: [Cursos]
 *      responses:
 *          200:
 *              description: Lista de cursos con información detallada
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/Curso'
 *          500:
 *              description: Error del servidor
 */

route.get("/cursos", findCursos);

/**
 * @swagger
 * /create/cursos:
 *  post:
 *      summary: Crea un nuevo curso
 *      tags: [Cursos]
 *      requestBody:
 *          $ref: '#/components/requestBodies/CursoBody'
 *      responses:
 *          201:
 *              description: Curso creado exitosamente
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Curso'
 *          400:
 *              description: Error en los datos proporcionados
 *          500:
 *              description: Error del servidor
 */
route.post("/create/cursos", createCursos);

/**
 * @swagger
 * /cursos/addEstudiante/{idCurso}:
 *  post:
 *      summary: Agrega un estudiante al curso
 *      tags: [Cursos]
 *      parameters:
 *          - $ref: '#/components/parameters/cursoId'
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          idEstudiante:
 *                              type: string
 *                              description: ID del estudiante a agregar
 *                              example: "60d21b4667d0d8992e610c86"
 *      responses:
 *          200:
 *              description: Estudiante agregado al curso exitosamente
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Curso'
 *          400:
 *              description: Error en la solicitud
 *          404:
 *              description: Curso o estudiante no encontrado
 *          500:
 *              description: Error del servidor
 */
route.post("/cursos/addEstudiante/:idCurso", agregarEstudiantes);

/**
 * @swagger
 * /cursos/addDirector/{idCurso}:
 *  post:
 *      summary: Asigna un director al curso
 *      tags: [Cursos]
 *      parameters:
 *          - $ref: '#/components/parameters/cursoId'
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          idProfesor:
 *                              type: string
 *                              description: ID del profesor a asignar como director
 *                              example: "60d21b4667d0d8992e610c87"
 *      responses:
 *          200:
 *              description: Director asignado exitosamente
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Curso'
 *          400:
 *              description: Error en la solicitud
 *          404:
 *              description: Curso o profesor no encontrado
 *          500:
 *              description: Error del servidor
 */
route.post("/cursos/addDirector/:idCurso", agregarDirector);

/**
 * @swagger
 * /cursos/addMateria/{idCurso}:
 *  post:
 *      summary: Agrega una materia al curso
 *      tags: [Cursos]
 *      parameters:
 *          - $ref: '#/components/parameters/cursoId'
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          idMateria:
 *                              type: string
 *                              description: ID de la materia a agregar
 *                              example: "60d21b4667d0d8992e610c88"
 *      responses:
 *          200:
 *              description: Materia agregada al curso exitosamente
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Curso'
 *          400:
 *              description: Error en la solicitud
 *          404:
 *              description: Curso o materia no encontrado
 *          500:
 *              description: Error del servidor
 */
route.post("/cursos/addMateria/:idCurso", addMaterias);

/**
 * @swagger
 * /cursos/deleteDirector/{idCurso}:
 *  delete:
 *      summary: Elimina el director del curso
 *      tags: [Cursos]
 *      parameters:
 *          - $ref: '#/components/parameters/cursoId'
 *      responses:
 *          200:
 *              description: Director eliminado exitosamente
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Curso'
 *          404:
 *              description: Curso no encontrado o sin director asignado
 *          500:
 *              description: Error del servidor
 */
route.delete("/cursos/deleteDirector/:idCurso", deleteDirector);

/**
 * @swagger
 * /cursos/deleteEstudiante/{idCurso}:
 *  delete:
 *      summary: Elimina un estudiante del curso
 *      tags: [Cursos]
 *      parameters:
 *          - $ref: '#/components/parameters/cursoId'
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          idEstudiante:
 *                              type: string
 *                              description: ID del estudiante a eliminar
 *                              example: "60d21b4667d0d8992e610c86"
 *      responses:
 *          200:
 *              description: Estudiante eliminado del curso exitosamente
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Curso'
 *          400:
 *              description: Error en la solicitud
 *          404:
 *              description: Curso o estudiante no encontrado
 *          500:
 *              description: Error del servidor
 */
route.delete("/cursos/deleteEstudiante/:idCurso", deleteEstudiante);

/**
 * @swagger
 * /cursos/deleteMateria/{idCurso}:
 *  delete:
 *      summary: Elimina una materia del curso
 *      tags: [Cursos]
 *      parameters:
 *          - $ref: '#/components/parameters/cursoId'
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          idMateria:
 *                              type: string
 *                              description: ID de la materia a eliminar
 *                              example: "60d21b4667d0d8992e610c88"
 *      responses:
 *          200:
 *              description: Materia eliminada del curso exitosamente
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Curso'
 *          400:
 *              description: Error en la solicitud
 *          404:
 *              description: Curso o materia no encontrado
 *          500:
 *              description: Error del servidor
 */
route.delete("/cursos/deleteMateria/:idCurso", deleteMaterias);

/**
 * @swagger
 * /cursos/edit/{idCurso}:
 *  put:
 *      summary: Actualiza la información de un curso
 *      tags: [Cursos]
 *      parameters:
 *          - $ref: '#/components/parameters/cursoId'
 *      requestBody:
 *          $ref: '#/components/requestBodies/CursoBody'
 *      responses:
 *          200:
 *              description: Curso actualizado exitosamente
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Curso'
 *          400:
 *              description: Error en los datos proporcionados
 *          404:
 *              description: Curso no encontrado
 *          500:
 *              description: Error del servidor
 */
route.put("/cursos/edit/:idCurso", editCursos);

export default route;
