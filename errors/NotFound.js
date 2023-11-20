const { statusCode } = require('../utils/constants');

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = statusCode.NOT_FOUND_ERROR;
  }
}
module.exports = NotFoundError;
