const { statusCode } = require('../utils/constants');

class UnauthorizedError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = statusCode.UNAUTHORIZED_ERROR;
  }
}
module.exports = UnauthorizedError;
