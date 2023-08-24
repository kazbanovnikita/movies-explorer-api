/* eslint-disable import/no-extraneous-dependencies */
const mongoose = require('mongoose');
const validator = require('validator');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    required: true,
    validate: {
      validator: (val) => validator.isURL(val),
      message: 'Введен некорректный URL',
    },
    type: String,
  },
  trailerLink: {
    required: true,
    validate: {
      validator: (val) => validator.isURL(val),
      message: 'Введен некорректный URL',
    },
    type: String,
  },
  thumbnail: {
    required: true,
    validate: {
      validator: (val) => validator.isURL(val),
      message: 'Введен некорректный URL',
    },
    type: String,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  movieId: {
    required: true,
    type: Number,
  },
  nameRU: {
    required: true,
    type: String,
  },
  nameEN: {
    required: true,
    type: String,
  },
}, { versionKey: false });

module.exports = mongoose.model('movie', movieSchema);
