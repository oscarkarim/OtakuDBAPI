import express from 'express';
import mysql from 'mysql2/promise';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import redoc from 'redoc-express';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { apiReference } from '@scalar/express-api-reference';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const domain = process.env.RAILWAY_PUBLIC_DOMAIN || `http://localhost:${port}`;

// Middleware
app.use(express.json());

// MySQL Connection
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Readme
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const readmePath = path.join(__dirname, 'readme.md');
const readmeContent = fs.readFileSync(readmePath, 'utf-8');

// Swagger Config
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'OtakuDB API',
      version: '1.0.0',
      description: readmeContent, // Inject the converted README HTML here
    },
    servers: [{ url: `${process.env.RAILWAY_PUBLIC_DOMAIN}` }],
    components: {
      schemas: {
        Anime: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              description: 'ID único del anime asignado en la BD (autoincremental)',
            },
            uid: {
              type: 'integer',
              description: 'ID único del anime',
            },
            title: {
              type: 'string',
              maxLength: 255,
              description: 'Título del anime',
            },
            synopsis: {
              type: 'string',
              nullable: true,
              description: 'Descripción breve o sinopsis del anime',
            },
            genre: {
              type: 'array',
              items: {
                type: 'string',
              },
              description: 'Lista de géneros del anime',
            },
            aired: {
              type: 'string',
              nullable: true,
              description: 'Año en el que se emitió el anime',
            },
            episodes: {
              type: 'integer',
              nullable: true,
              description: 'Número de episodios del anime',
            },
            members: {
              type: 'integer',
              nullable: true,
              description: 'Número de miembros en MyAnimeList',
            },
            popularity: {
              type: 'integer',
              nullable: true,
              description: 'Posición de popularidad del anime',
            },
            ranked: {
              type: 'integer',
              nullable: true,
              description: 'Posición del anime en el ranking',
            },
            score: {
              type: 'number',
              format: 'float',
              nullable: true,
              description: 'Puntuación del anime (entre 0 y 10)',
            },
            img_url: {
              type: 'string',
              format: 'uri',
              nullable: true,
              description: 'URL de la imagen del anime',
            },
            link: {
              type: 'string',
              format: 'uri',
              nullable: true,
              description: 'Enlace al sitio del anime',
            },
          },
          required: ['title'],
        },
      },
    },
  },
  apis: ['src/routes/*.js'],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);

// Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Redoc
app.get('/redoc', redoc({ 
  title: 'OtakuDB API',
    specUrl: '/swagger.json',
    nonce: '', // <= it is optional,we can omit this key and value
    // we are now start supporting the redocOptions object
    // you can omit the options object if you don't need it
    // https://redocly.com/docs/api-reference-docs/configuration/functionality/
    redocOptions: {
      theme: {
        colors: {
          primary: {
            main: '#6EC5AB'
          }
        },
        typography: {
          fontFamily: `"museo-sans", 'Helvetica Neue', Helvetica, Arial, sans-serif`,
          fontSize: '15px',
          lineHeight: '1.5',
          code: {
            code: '#87E8C7',
            backgroundColor: '#4D4D4E'
          }
        },
        menu: {
          backgroundColor: '#ffffff'
        }
      }
    }
}));

// Serve Swagger JSON for Redoc
app.get('/swagger.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerDocs);
});

// Scalar
app.use(
  '/scalar',
  apiReference({
    theme: 'elysiajs',
    /*
      otros temas disponibles:
      default: 'Default',
      alternate: 'Alternate',
      moon: 'Moon',
      purple: 'Purple',
      solarized: 'Solarized',
      elysiajs: 'Elysia.js',
      fastify: 'Fastify',
      bluePlanet: 'Blue Planet',
      saturn: 'Saturn',
      kepler: 'Kepler-11e',
      mars: 'Mars',
      deepSpace: 'Deep Space',
      none: '',
    */ 
    spec: {
      // Put your OpenAPI url here:
      url: '/swagger.json',
    },
  }),
)

// Routes
import animeRoutes from './routes/animeRoutes.js';
app.use('/api/animes', animeRoutes);

app.get('/random', function(req, res) {
  res.sendFile(path.join(__dirname, '/random.html'));
});

// Start Server
app.listen(port, () => {
  console.log(`Server running on ${domain}`);
  console.log(`mostrar anime random en ${domain}/random`);
  console.log(`Swagger UI: ${domain}/api-docs`);
  console.log(`Redoc: ${domain}/redoc`);
  console.log(`Scalar: ${domain}/scalar`);
});
