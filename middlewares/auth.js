/* eslint-disable import/no-extraneous-dependencies */
const jwt = require('jsonwebtoken');

const NotFoundAuthError = require('../erorrs/notFoundAuthError');

const { NODE_ENV, JWT_SECRET } = process.env;

const handleAuthError = (req, res, next) => next(new NotFoundAuthError('Пожалуйста, аторизируйтесь'));

const auth = (req, res, next) => {
  let payload;

  try {
    const { authorization } = req.headers;
    const token = authorization.replace('Bearer ', '');
    if (!token) {
      return handleAuthError(req, res, next);
    }
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'secret');
    req.user = payload;
  } catch (err) {
    return handleAuthError(req, res, next);
  }
  req.user = payload;

  return next();
};

module.exports = auth;
