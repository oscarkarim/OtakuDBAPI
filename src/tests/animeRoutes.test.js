import { describe, it, expect } from 'vitest';
import request from 'supertest';
import express from 'express';
import animeRouter from '../routes/animeRoutes.js';

const app = express();
app.use(express.json());
app.use('/api/animes', animeRouter);

describe('Rutas de Anime', () => {
  describe('GET /api/animes', () => {
    it('debería devolver una lista de animes', async () => {
      const response = await request(app).get('/api/animes');

      expect(response.status).toBe(200);
      expect(response.body).toBeInstanceOf(Array);
    });
  });

  describe('POST /api/animes', () => {
    it('debería crear un nuevo anime y devolverlo', async () => {
      const newAnime = {
        "uid": 1112,
        "title": "Attack on Titan3334",
        "synopsis": "Humans fight against giant creatures to survive.",
        "genre": [
          "Action",
          "Drama",
          "test"
        ],
        "aired": "2013",
        "episodes": 25,
        "members": 2000000,
        "popularity": 1,
        "ranked": 2,
        "score": 9.1,
        "img_url": "https://example.com/aot.jpg",
        "link": "https://example.com/aot"
      };
      const response = await request(app)
        .post('/api/animes')
        .send(newAnime);

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('id');
      expect(response.body.title).toBe(newAnime.title);
    });

    it('debería devolver un error 400 si faltan campos obligatorios', async () => {
      
      const newAnime2 = {
        "uid": 1112,
        "synopsis": "Humans fight against giant creatures to survive.",
        "genre": [
          "Action",
          "Drama",
          "test"
        ],
        "aired": "2013",
        "episodes": 25,
        "members": 2000000,
        "popularity": 1,
        "ranked": 2,
        "score": 9.1,
        "img_url": "https://example.com/aot.jpg",
        "link": "https://example.com/aot"
      };
      const response = await request(app)
        .post('/api/animes')
        .send(newAnime2);

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('errors');
    });
  });
});
