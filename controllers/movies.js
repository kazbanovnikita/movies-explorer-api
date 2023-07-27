const Movie = require('../models/movie');
const InvalidDataErorr = require('../erorrs/invalidDataErorr');
const NotFoundError = require('../erorrs/notFoundError');
const NotAccessError = require('../erorrs/notAccessError');

const { STATUS_OK } = require('../utils/constants');

const createMovie = (req, res, next) => {
  const movie = req.body;
  movie.owner = req.user;
  Movie.create(movie)
    .then((movieFromDb) => res.status(STATUS_OK).send(movieFromDb))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new InvalidDataErorr('Переданы некорректные данные'));
      } else {
        next(err);
      }
    });
};

const getMovies = (req, res, next) => {
  const { _id } = req.user;
  Movie.find({ owner: _id })
    .then((movies) => res.send(movies))
    .catch(next);
};

const deleteMovie = (req, res, next) => {
  const { movieId } = req.params;
  const { _id } = req.user;
  Movie.findById(movieId)
    .orFail(new NotFoundError('Id фильма не сущесвует'))
    .then((movie) => {
      if (movie.owner.toString() !== _id) {
        return Promise.reject(new NotAccessError('Нельзя удалять чужие данные'));
      }
      return Movie.deleteOne(movie)
        .then(() => res.send({ massege: 'Фильм удален' }));
    })
    .catch(next);
};

module.exports = {
  createMovie,
  getMovies,
  deleteMovie,
};
