const { statusCode } = require('../utils/constants');

class ForbiddenError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = statusCode.accessIsDenied;
  }
}
module.exports = ForbiddenError;
