import express from 'express';
import { getAnimes, createAnime, updateAnime, deleteAnime } from '../controllers/animeController.js';
import { validate, validateGet, validatePatch } from '../middleware/validate.js';
import { animeSchema, animeSchemaGet, animeSchemaPatch } from '../validation/animeSchema.js';

const router = express.Router();

/**
 * @swagger
 * /api/animes:
 *   get:
 *     summary: Obtiene un anime o lista de animes basado en parámetros de búsqueda
 *     parameters:
 *       - name: id
 *         in: query
 *         required: false
 *         schema:
 *           type: integer
 *         description: >
 *           Opcional: El ID único del anime a obtener. Si no se proporciona, 
 *           se buscan todos los animes.
 *       - name: title
 *         in: query
 *         required: false
 *         schema:
 *           type: string
 *         description: >
 *           Opcional: El título o parte del título del anime a buscar. 
 *           El orden de las palabras no importa.
 *       - name: genre
 *         in: query
 *         required: false
 *         schema:
 *           type: string
 *         description: >
 *           Opcional: El género del anime a buscar. Se buscarán coincidencias 
 *           parciales.
 *     responses:
 *       200:
 *         description: Un anime o una lista de animes basados en los parámetros proporcionados, si no hay parametros se obtienen todos los animes.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   title:
 *                     type: string
 *                   genre:
 *                     type: string
 *                   # Agregar más campos si es necesario
 *             examples:
 *               example1:
 *                 value:
 *                   - id: 1
 *                     uid: 28891
 *                     title: "Haikyuu!! Second Season"
 *                     synopsis: |
 *                       Siguiendo su participación en el Inter-High, el equipo de voleibol de la escuela secundaria Karasuno intenta reenfocar sus esfuerzos, apuntando a conquistar el torneo de primavera.
 *                     genre: "['Comedia', 'Deportes', 'Drama', 'Escolar', 'Shounen']"
 *                     aired: "4 de octubre de 2015 al 27 de marzo de 2016"
 *                     episodes: 25
 *                     members: 489888
 *                     popularity: 141
 *                     ranked: 25
 *                     score: "8.80"
 *                     img_url: "https://cdn.myanimelist.net/images/anime/9/76662.jpg"
 *                     link: "https://myanimelist.net/anime/28891/Haikyuu_Second_Season"
 *       404:
 *         description: No se encontraron resultados para los parámetros de búsqueda proporcionados.
 *       500:
 *         description: Error del servidor.
 *     x-codeSamples:
 *       - lang: "javascript"
 *         source: |
 *           fetch('/api/animes?title=Haikyuu&genre=Deportes')
 *             .then(response => response.json())
 *             .then(data => console.log(data));
 *       - lang: "python"
 *         source: |
 *           import requests
 *           response = requests.get('http://localhost:3001/api/animes?title=Haikyuu&genre=Deportes')
 *           print(response.json())
 */
router.get('/', validateGet(animeSchemaGet, 'query'), getAnimes);



/**
 * @swagger
 * /api/animes:
 *   post:
 *     summary: Crea un nuevo anime
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               uid:
 *                 type: integer
 *               title:
 *                 type: string
 *                 required: true
 *               synopsis:
 *                 type: string
 *               genre:
 *                 type: array
 *                 items:
 *                   type: string
 *               aired:
 *                 type: string
 *               episodes:
 *                 type: integer
 *               members:
 *                 type: integer
 *               popularity:
 *                 type: integer
 *               ranked:
 *                 type: integer
 *               score:
 *                 type: number
 *                 format: float
 *               img_url:
 *                 type: string
 *               link:
 *                 type: string
 *           examples:
 *             example-1:
 *               value:
 *                 uid: 101
 *                 title: "Attack on Titan"
 *                 synopsis: "Humans fight against giant creatures to survive."
 *                 genre:
 *                   - "Action"
 *                   - "Drama"
 *                 aired: "2013"
 *                 episodes: 25
 *                 members: 2000000
 *                 popularity: 1
 *                 ranked: 2
 *                 score: 9.1
 *                 img_url: "https://example.com/aot.jpg"
 *                 link: "https://example.com/aot"
 *     x-codeSamples:
 *       - lang: "javascript"
 *         source: |
 *           fetch('/api/animes', {
 *             method: 'POST',
 *             headers: {
 *               'Content-Type': 'application/json',
 *             },
 *             body: JSON.stringify({
 *               uid: 101,
 *               title: "Attack on Titan",
 *               synopsis: "Humans fight against giant creatures to survive.",
 *               genre: ["Action", "Drama"],
 *               aired: "2013",
 *               episodes: 25
 *             }),
 *           })
 *           .then(response => response.json())
 *           .then(data => console.log(data));
 *       - lang: "python"
 *         source: |
 *           import requests
 *           payload = {
 *             "uid": 101,
 *             "title": "Attack on Titan",
 *             "synopsis": "Humans fight against giant creatures to survive.",
 *             "genre": ["Action", "Drama"],
 *             "aired": "2013",
 *             "episodes": 25
 *           }
 *           response = requests.post('http://localhost:3001/api/animes', json=payload)
 *           print(response.json())
 *     responses:
 *       201:
 *         description: Anime creado
 */
router.post('/', validate(animeSchema), createAnime);

/**
 * @swagger
 * /api/animes:
 *   patch:
 *     summary: Actualizar uno o varios campos de un anime
 *     parameters:
 *       - name: id
 *         in: query
 *         required: true
 *         schema:
 *           type: string
 *         description: id del anime
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               synopsis:
 *                 type: string
 *               genre:
 *                 type: array
 *                 items:
 *                   type: string
 *               aired:
 *                 type: string
 *               episodes:
 *                 type: integer
 *               members:
 *                 type: integer
 *               popularity:
 *                 type: integer
 *               ranked:
 *                 type: integer
 *               score:
 *                 type: string
 *               img_url:
 *                 type: string
 *               link:
 *                 type: string
 *           examples:
 *             example-1:
 *               value:
 *                 title: "Haikyuu!! Updated"
 *                 score: "9.0"
 *     responses:
 *       200:
 *         description: campo(s) actualizado(s) con exito
 *         x-codeSamples:
 *           - lang: "javascript"
 *             source: |
 *               fetch('/api/animes?uid=28891', {
 *                 method: 'PATCH',
 *                 headers: {
 *                   'Content-Type': 'application/json',
 *                 },
 *                 body: JSON.stringify({
 *                   title: "Haikyuu!! Updated",
 *                   score: "9.0",
 *                 }),
 *               }).then(response => response.json())
 *                 .then(data => console.log(data));
 *           - lang: "python"
 *             source: |
 *               import requests
 *               payload = {
 *                 "title": "Haikyuu!! Updated",
 *                 "score": "9.0"
 *               }
 *               response = requests.patch('http://localhost:3001/api/animes?uid=28891', json=payload)
 *               print(response.json())
 *       400:
 *         description: inputs invalidos o restringidos.
 *       404:
 *         description: Anime no encontrado
 */
router.patch('/',validatePatch(animeSchemaPatch), updateAnime);

/**
 * @swagger
 * /api/animes:
 *   delete:
 *     summary: Borrar un anime por su ID
 *     parameters:
 *       - name: id
 *         in: query
 *         required: true
 *         schema:
 *           type: integer
 *         description: El ID único del anime a borrar
 *     responses:
 *       200:
 *         description: Anime borrado
 *       404:
 *         description: Anime no encontrado
 *       500:
 *         description: Error del servidor
 *     x-codeSamples:
 *       - lang: "javascript"
 *         source: |
 *           fetch('/api/animes?id=1', { method: 'DELETE' })
 *             .then(response => response.json())
 *             .then(data => console.log(data));
 *       - lang: "python"
 *         source: |
 *           import requests
 *           response = requests.delete('http://localhost:3001/api/animes?id=1')
 *           print(response.json())
 */
router.delete('/', validateGet(animeSchemaGet, 'query'), deleteAnime);

export default router;
