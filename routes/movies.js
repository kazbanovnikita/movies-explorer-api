const router = require('express').Router();
const { validateMovieID, validateMovie } = require('../utils/validate');

const { createMovie, getMovies, deleteMovie } = require('../controllers/movies');

router.post('/', validateMovie, createMovie);

router.get('/', getMovies);

router.delete('/:movieId', validateMovieID, deleteMovie);

module.exports = router;
