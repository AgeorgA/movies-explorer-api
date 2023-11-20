const { ValidationError, CastError } = require('mongoose').Error;
const Movie = require('../models/movie');
const statusCodes = require('../utils/constants');
const { message } = require('../utils/constants');
const NotFoundError = require('../errors/NotFound');
const BadRequestError = require('../errors/BadRequest');
const ForbiddenError = require('../errors/Forbidden');

module.exports.getMovies = (req, res, next) => {
  const owner = req.user._id;
  Movie.find({ owner })
    .then((movies) => res.status(statusCodes.OK_CODE).send(movies))
    .catch(next);
};

module.exports.createMovie = (req, res, next) => {
  const owner = req.user._id;
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
    owner,
  })
    .then((movie) => res.status(statusCodes.CREATED_CODE).send(movie))
    .catch((error) => {
      if (error instanceof ValidationError) {
        return next(new BadRequestError(message.CreateMovieMessage));
      }
      return next(error);
    });
};

module.exports.deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId)

    .orFail(new NotFoundError(message.NotFoundMessage))
    .then((movie) => {
      if (movie.owner.toString() !== req.user._id) {
        return next(new ForbiddenError(message.DeleteMovieMessage));
      }
      return Movie.deleteOne(movie).then(() => res.status(statusCodes.OK_CODE).send(movie));
    })
    .catch((error) => {
      if (error instanceof CastError) {
        return next(new BadRequestError(message.BadRequestMessage));
      }
      return next(error);
    });
};
