const { statusCode } = require('../utils/constants');

class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = statusCode.dataError;
  }
}
module.exports = BadRequestError;
