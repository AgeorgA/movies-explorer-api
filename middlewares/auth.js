require('dotenv').config();
const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/Unauthorized');
const { message } = require('../utils/constants');
const { JWT_SECRET } = require('../utils/config');

const handleAuthError = (res, next) => {
  next(new UnauthorizedError(message.unauthorizedMessage));
};

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    return handleAuthError(res, next);
  }
  let payload;
  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return handleAuthError(res, next);
  }
  req.user = payload;
  return next();
};
