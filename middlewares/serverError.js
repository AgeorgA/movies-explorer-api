const { statusCode, message } = require('../utils/constants');

module.exports = (err, req, res, next) => {
  if (err.statusCode) {
    res.status(err.statusCode).send({ message: err.message });
  } else {
    res
      .status(statusCode.INTERNAL_SERVER_ERROR)
      .send({ message: message.ServerErrorMessage });
  }
  res.status(err.statusCode).send({
    message:
      err.statusCode === statusCode.errorServer
        ? message.serverError
        : err.message,
  });
  next();
};
