require('dotenv').config();

const { ValidationError, CastError } = require('mongoose').Error;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const statusCodes = require('../utils/constants');
const { message } = require('../utils/constants');
const { JWT_SECRET } = require('../utils/config');
const NotFoundError = require('../errors/NotFound');
const BadRequestError = require('../errors/BadRequest');
const ConflictError = require('../errors/Conflict');

module.exports.createUser = (req, res, next) => {
  const { email, name } = req.body;
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      User.create({
        email,
        password: hash,
        name,
      })
        .then((user) => {
          const { _id } = user;
          res.status(statusCodes.CREATED_CODE).send({
            name,
            email,
            _id,
          });
        })
        .catch((error) => {
          if (error instanceof ValidationError) {
            return next(new BadRequestError(message.BadRequestMessage));
          }
          if (error.code === 11000) {
            return next(new ConflictError(message.ConflictMessage));
          }
          return next(error);
        });
    })
    .catch(next);
};

module.exports.getUser = (req, res, next) => {
  const userId = req.user._id;
  User.findById(userId)
    .orFail(new NotFoundError(message.NotFoundMessage))
    .then((user) => res.status(statusCodes.OK_CODE).send(user))
    .catch(next);
};

module.exports.updateUser = (req, res, next) => {
  const userId = req.user._id;
  const { name, email } = req.body;
  User.findByIdAndUpdate(
    userId,
    { name, email },
    { new: true, runValidators: true },
  )
    .orFail(new NotFoundError(message.NotFoundMessage))
    .then((user) => res.send(user))
    .catch((error) => {
      if (error instanceof CastError) {
        return next(new BadRequestError(message.UpdateUserMessage));
      }
      return next(error);
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredintails(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: '7d',
      });
      return res
        .cookie('jwt', token, {
          maxAge: 3600000 * 24 * 7,
          httpOnly: true,
          sameSite: true,
        })
        .send({ token });
    })
    .catch(next);
};

module.exports.logoutUser = (req, res, next) => {
  try {
    res
      .clearCookie('jwt', { httpOnly: true })
      .send({ exit: 'Выход пользователя из системы успешен' });
  } catch (err) {
    next(err);
  }
};
