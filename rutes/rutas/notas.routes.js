import { Router } from "express";
import { findNotas, createNotas, addNota, eliminarNota } from "../controllers/notas.js";

const route = Router();

/**
 * @swagger
 * components:
 *  schemas:
 *      Nota:
 *          type: object
 *          properties:
 *              _id:
 *                  type: string
 *                  description: ID único de la nota
 *              materia:
 *                  type: object
 *                  properties:
 *                      _id:
 *                          type: string
 *                      nombre:
 *                          type: string
 *                  description: Información de la materia
 *              estudiante:
 *                  type: object
 *                  properties:
 *                      _id:
 *                          type: string
 *                      nombres:
 *                          type: string
 *                  description: Información del estudiante
 *              notas:
 *                  type: array
 *                  items:
 *                      type: number
 *                  description: Lista de notas del estudiante
 *              promedio:
 *                  type: number
 *                  description: Promedio de las notas
 *              __v:
 *                  type: number
 *                  description: Versión del documento
 *          example:
 *              _id: 60d21b4667d0d8992e610c85
 *              materia: { _id: "60d21b4667d0d8992e610c86", nombre: "Matemáticas" }
 *              estudiante: { _id: "60d21b4667d0d8992e610c87", nombres: "Juan Pérez" }
 *              notas: [15, 18, 17]
 *              promedio: 16.67
 *              __v: 0
 *
 *  parameters:
 *      notaId:
 *          in: path
 *          name: idNota
 *          required: true
 *          schema:
 *              type: string
 *          description: ID de la nota
 *
 *  requestBodies:
 *      NotaBody:
 *          description: Datos de la nota
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          materia:
 *                              type: string
 *                              description: ID de la materia
 *                              example: 60d21b4667d0d8992e610c86
 *                          estudiante:
 *                              type: string
 *                              description: ID del estudiante
 *                              example: 60d21b4667d0d8992e610c87
 *                          notas:
 *                              type: array
 *                              items:
 *                                  type: number
 *                              description: Lista de notas
 *                              example: [15, 18, 17]
 */

/**
 * @swagger
 * tags:
 *  name: Notas
 *  description: Endpoints para el manejo de notas académicas
 */

/**
 * @swagger
 * /notas:
 *  get:
 *      summary: Obtiene todas las notas con información de estudiantes y materias
 *      tags: [Notas]
 *      responses:
 *          200:
 *              description: Lista de notas con sus promedios
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              notas:
 *                                  type: array
 *                                  items:
 *                                      $ref: '#/components/schemas/Nota'
 *          500:
 *              description: Error del servidor
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              mensaje:
 *                                  type: string
 *                                  example: Error al buscar notas
 */
route.get("/notas", findNotas);

/**
 * @swagger
 * /notas/create:
 *  post:
 *      summary: Crea un nuevo registro de notas
 *      tags: [Notas]
 *      requestBody:
 *          $ref: '#/components/requestBodies/NotaBody'
 *      responses:
 *          201:
 *              description: Nota creada exitosamente
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Nota'
 *          400:
 *              description: Error en la solicitud
 *          500:
 *              description: Error del servidor
 */
route.post("/notas/create", createNotas);

/**
 * @swagger
 * /notas/addNotas/{idNota}:
 *  post:
 *      summary: Agrega una nueva nota a un registro existente
 *      tags: [Notas]
 *      parameters:
 *          - $ref: '#/components/parameters/notaId'
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          nuevaNota:
 *                              type: number
 *                              description: Nueva nota a agregar
 *                              example: 18
 *      responses:
 *          200:
 *              description: Nota agregada exitosamente
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Nota'
 *          400:
 *              description: Error en la solicitud
 *          404:
 *              description: Registro de notas no encontrado
 *          500:
 *              description: Error del servidor
 */
route.post("/notas/addNotas/:idNota", addNota);

/**
 * @swagger
 * /notas/deleteNota/{idNota}:
 *  delete:
 *      summary: Elimina un registro de notas
 *      tags: [Notas]
 *      parameters:
 *          - $ref: '#/components/parameters/notaId'
 *      responses:
 *          200:
 *              description: Nota eliminada exitosamente
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              mensaje:
 *                                  type: string
 *                                  example: Nota eliminada correctamente
 *          404:
 *              description: Nota no encontrada
 *          500:
 *              description: Error del servidor
 */
route.delete("/notas/deleteNota/:idNota", eliminarNota);

export default route;