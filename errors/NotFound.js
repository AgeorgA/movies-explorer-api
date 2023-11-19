const { statusCode } = require('../utils/constants');

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = statusCode.errorNotFound;
  }
}
module.exports = NotFoundError;
