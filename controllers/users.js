require('dotenv').config();

const { ValidationError, CastError } = require('mongoose').Error;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const statusCodes = require('../utils/constants').HTTP_STATUS;
const { message } = require('../utils/constants');
const { JWT_SECRET } = require('../utils/config');
const NotFoundError = require('../errors/NotFound');
const BadRequestError = require('../errors/BadRequest');
const ConflictError = require('../errors/Conflict');

module.exports.createUser = (req, res, next) => {
  const { name, email, password } = req.body;
  bcrypt
    .hash(password, 10)
    .then((hash) => User.create({
      name,
      email,
      password: hash,
    }))
    .then((user) => res.status(statusCodes.CREATED).send({
      name: user.name,
      email: user.email,
    }))
    .catch((error) => {
      if (error instanceof ValidationError) {
        return next(new BadRequestError(message.BadRequestMessage));
      }
      if (error.code === 11000) {
        return next(new ConflictError(message.ConflictMessage));
      }
      return next(error);
    });
};

function updateUser(req, res, newData, next) {
  const userId = req.user._id;
  User.findByIdAndUpdate(userId, newData, { new: true, runValidators: true })
    .orFail(new NotFoundError('NotFound'))
    .then((user) => res.status(statusCodes.CREATED).send(user))
    .catch((error) => {
      if (error instanceof CastError) {
        return next(new BadRequestError(message.UpdateUserMessage));
      }
      return next(error);
    });
}

module.exports.updateProfile = (req, res) => {
  const { name, email } = req.body;
  updateUser(req, res, { name, email });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      res.status(200).send({
        token: jwt.sign({ _id: user._id }, JWT_SECRET, {
          expiresIn: '7d',
        }),
      });
    })
    .catch(next);
};
