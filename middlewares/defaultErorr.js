const { ERROR_DEFAULT } = require('../utils/constants');

module.exports = (err, req, res, next) => {
  const { statusCode = ERROR_DEFAULT, message } = err;

  res.status(statusCode)
    .send(
      {
        message: statusCode === ERROR_DEFAULT
          ? 'Ошибка на сервере' : message,
      },
    );
  next();
};
