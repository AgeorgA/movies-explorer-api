const router = require('express').Router();

const userRoutes = require('./users');
const cardRoutes = require('./movies');
const NotFoundError = require('../errors/NotFound');

router.use('/users', userRoutes);
router.use('/movies', cardRoutes);
router.use('*', (req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
});

module.exports = router;
