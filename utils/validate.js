/* eslint-disable no-useless-escape */
/* eslint-disable import/no-extraneous-dependencies */
const { celebrate, Joi, Segments } = require('celebrate');

const regex = /^(https?:\/\/)?[^\s]*\.(jpg|jpeg|png|gif|bmp|test)$/;
const regURL = /(?:https?):\/\/(\w+:?\w*)?(\S+)(:\d+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;

module.exports.validateUserCreate = celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    password: Joi.string().required(),
    email: Joi.string().required().email(),
  }),
});

module.exports.validateUserData = celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().required().email(),
  }),
});

module.exports.validateUserAuth = celebrate({
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

module.exports.validateMovieID = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    movieId: Joi.string().length(24).hex().required(),
  }),
});

module.exports.validateMovie = celebrate({
  [Segments.BODY]: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().pattern(regex).required(),
    trailerLink: Joi.string().pattern(regURL).required(),
    thumbnail: Joi.string().pattern(regex).required(),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});
