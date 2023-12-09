const router = require('express').Router();
const validator = require('../middlewares/validator');
const {
  getMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');

router.get('/', getMovies);
router.post('/', validator.createMovieValid, createMovie);
router.delete('/:movieId', validator.deleteMovieValid, deleteMovie);

module.exports = router;
