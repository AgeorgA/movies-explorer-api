const { statusCode } = require('../utils/constants');

class UnauthorizedError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = statusCode.authError;
  }
}
module.exports = UnauthorizedError;
