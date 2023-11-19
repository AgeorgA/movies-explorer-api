const { statusCode, message } = require('../utils/constants');

module.exports = (err, req, res, next) => {
  res.status(err.statusCode).send({
    message:
      err.statusCode === statusCode.errorServer
        ? message.serverError
        : err.message,
  });
  next();
};
