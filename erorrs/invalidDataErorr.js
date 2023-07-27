const ERROR_INVALID_DATA = require('../utils/constants');

class IvalidDataError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = ERROR_INVALID_DATA;
    this.name = 'IncorrectData';
  }
}

module.exports = IvalidDataError;
