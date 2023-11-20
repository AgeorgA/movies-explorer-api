const { statusCode } = require('../utils/constants');

class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = statusCode.BAD_REQUEST_ERROR;
  }
}
module.exports = BadRequestError;
