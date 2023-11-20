const { statusCode } = require('../utils/constants');

class ForbiddenError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = statusCode.FORBIDDEN_ERROR;
  }
}
module.exports = ForbiddenError;
