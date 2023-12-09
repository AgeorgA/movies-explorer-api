const router = require('express').Router();
const { message } = require('../utils/constants');

const userRoutes = require('./users');
const moviesRoutes = require('./movies');
const NotFoundError = require('../errors/NotFound');
const { login, createUser } = require('../controllers/users');
const auth = require('../middlewares/auth');
const validator = require('../middlewares/validator');

router.post('/signin', validator.loginValid, login);
router.post('/signup', validator.createUserValid, createUser);

router.use(auth);

router.use('/users', userRoutes);
router.use('/movies', moviesRoutes);
router.use('*', (req, res, next) => next(new NotFoundError(message.pageNotFoundMessage)));

module.exports = router;
