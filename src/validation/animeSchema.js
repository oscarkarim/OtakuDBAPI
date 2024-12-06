import Joi from 'joi';

export const animeSchema = Joi.object({
  uid: Joi.number().integer().required(),
  title: Joi.string().max(255).required(),
  synopsis: Joi.string().allow(null, ''),
  genre: Joi.array().items(Joi.string()).required(),
  aired: Joi.string().allow(null, ''),
  episodes: Joi.number().integer().allow(null),
  members: Joi.number().integer().allow(null),
  popularity: Joi.number().integer().allow(null),
  ranked: Joi.number().integer().allow(null),
  score: Joi.number().min(0).max(10).allow(null),
  img_url: Joi.string().uri().allow(null, ''),
  link: Joi.string().uri().allow(null, ''),
});


export const animeSchemaGet = Joi.object({
  id: Joi.number().integer().positive().not(0).allow(null, ''),
  genre: Joi.string().max(255),
  title: Joi.string().max(255),
});

export const animeSchemaPatch = Joi.object({
  uid: Joi.number().integer(),
  title: Joi.string().max(255),
  synopsis: Joi.string().allow(''),
  genre: Joi.array().items(Joi.string()),
  aired: Joi.string().allow(''),
  episodes: Joi.number().integer().allow(''),
  members: Joi.number().integer().allow(''),
  popularity: Joi.number().integer().allow(''),
  ranked: Joi.number().integer().allow(''),
  score: Joi.number().min(0).max(10).allow(''),
  img_url: Joi.string().uri().allow(''),
  link: Joi.string().uri().allow(''),
});