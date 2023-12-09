const { statusCode } = require('../utils/constants');

class ConflictError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = statusCode.CONFLICT_ERROR;
  }
}
module.exports = ConflictError;
