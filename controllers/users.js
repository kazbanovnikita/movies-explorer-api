/* eslint-disable import/no-extraneous-dependencies */
const bcrypt = require('bcryptjs');
const jsonWedToken = require('jsonwebtoken');
const User = require('../models/user');

const { ERROR_CODE_UNIQUE, STATUS_OK } = require('../utils/constants');

const { NODE_ENV, JWT_SECRET } = process.env;

// const NotFoundError = require('../erorrs/notFoundError');
const InvalidDataError = require('../erorrs/invalidDataErorr');
const NotUniqueData = require('../erorrs/NotUniqueDataError');
const NotFoundError = require('../erorrs/notFoundError');

const getCurrentUser = (req, res, next) => {
  User.findById(req.user)
    .orFail(new NotFoundError('Пользователь не найден'))
    .then((user) => res.status(STATUS_OK).send(user))
    .catch(next);
};

const createUser = (req, res, next) => {
  const {
    name, email, password,
  } = req.body;
  bcrypt.hash(password, 10).then((hashedPassword) => {
    User.create({
      name, email, password: hashedPassword,
    })
      .then((user) => res.status(STATUS_OK).send(user))
      .catch((err) => {
        if (err.code === ERROR_CODE_UNIQUE) {
          next(new NotUniqueData('Такая почта уже зарегестрированна '));
        } else if (err.name === 'ValidationError') {
          next(new InvalidDataError('Переданы некорректные данные'));
        } else {
          next(err);
        }
      });
  });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  User.findUserByIdentity(email, password)
    .then((user) => {
      const token = jsonWedToken.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'secret',
        { expiresIn: '7d' },
      );
      res.send({ token });
    })
    .catch(next);
};

const updateUserDate = (req, res, next) => {
  const { name, email } = req.body;
  const { _id } = req.user;

  User.findByIdAndUpdate(
    _id,
    { name, email },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new InvalidDataError('Переданы некорректные данные'));
      } else {
        next(err);
      }
    });
};

module.exports = {
  createUser,
  getCurrentUser,
  login,
  updateUserDate,
};
