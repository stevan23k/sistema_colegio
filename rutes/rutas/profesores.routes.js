import {Router} from "express";
import {
    findProfesores,
    createProfesores,
    findProfesoresByNames,
    deleteProfesores,
    editProfesores
} from "../controllers/profesores.js";
import cacheMiddleware from "../../middlewares/redis.js";

const route = Router();

/**
 * @swagger
 * components:
 *  schemas:
 *      Profesor:
 *          type: object
 *          properties:
 *              id:
 *                  type: string
 *                  description: ID único del profesor
 *              nombres:
 *                  type: string
 *                  description: Nombres del profesor
 *              apellidos:
 *                  type: string
 *                  description: Apellidos del profesor
 *          required:
 *              - nombres
 *              - apellidos
 *          example:
 *              nombres: "Juan Manuel"
 *              apellidos: "Perez Ramirez"
 *
 *  parameters:
 *      profesorId:
 *          in: path
 *          name: idProfesor
 *          required: true
 *          schema:
 *              type: string
 *          description: ID del profesor
 *      nombreProfesor:
 *          in: path
 *          name: nombre
 *          required: true
 *          schema:
 *              type: string
 *          description: Nombre del profesor a buscar
 */

/**
 * @swagger
 * tags:
 *  name: Profesores
 *  description: Endpoints para el manejo de profesores
 */

/**
 * @swagger
 * /create/profesores:
 *  post:
 *      summary: Crear un nuevo profesor
 *      tags: [Profesores]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Profesor'
 *      responses:
 *          201:
 *              description: Profesor creado exitosamente
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Profesor'
 *          400:
 *              description: Error en la solicitud
 *          500:
 *              description: Error del servidor
 */
route.post("/create/profesores", createProfesores);

/**
 * @swagger
 * /profesores:
 *  get:
 *      summary: Obtener todos los profesores
 *      tags: [Profesores]
 *      responses:
 *          200:
 *              description: Lista de profesores
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/Profesor'
 *          500:
 *              description: Error del servidor
 */
route.get("/profesores", cacheMiddleware("profesores"), findProfesores);

/**
 * @swagger
 * /profesores/{nombre}:
 *  get:
 *      summary: Buscar profesores por nombre
 *      tags: [Profesores]
 *      parameters:
 *          - $ref: '#/components/parameters/nombreProfesor'
 *      responses:
 *          200:
 *              description: Lista de profesores que coinciden con la búsqueda
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/Profesor'
 *          404:
 *              description: No se encontraron profesores
 *          500:
 *              description: Error del servidor
 */
route.get("/profesores/:nombre", findProfesoresByNames);

/**
 * @swagger
 * /profesores/delete/{idProfesor}:
 *  delete:
 *      summary: Eliminar un profesor por ID
 *      tags: [Profesores]
 *      parameters:
 *          - $ref: '#/components/parameters/profesorId'
 *      responses:
 *          200:
 *              description: Profesor eliminado exitosamente
 *          404:
 *              description: Profesor no encontrado
 *          500:
 *              description: Error del servidor
 */
route.delete("/profesores/delete/:idProfesor", deleteProfesores);

/**
 * @swagger
 * /profesores/edit/{idProfesor}:
 *  put:
 *      summary: Actualizar un profesor existente
 *      tags: [Profesores]
 *      parameters:
 *          - $ref: '#/components/parameters/profesorId'
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Profesor'
 *      responses:
 *          200:
 *              description: Profesor actualizado exitosamente
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Profesor'
 *          400:
 *              description: Error en la solicitud
 *          404:
 *              description: Profesor no encontrado
 *          500:
 *              description: Error del servidor
 */
route.put("/profesores/edit/:idProfesor", editProfesores);

export default route;
