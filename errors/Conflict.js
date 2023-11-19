const { statusCode } = require('../utils/constants');

class ConflictError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = statusCode.dataDublicate;
  }
}
module.exports = ConflictError;
