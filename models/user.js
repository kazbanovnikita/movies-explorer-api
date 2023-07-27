/* eslint-disable func-names */
/* eslint-disable import/no-extraneous-dependencies */
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');
const NotFoundAuth = require('../erorrs/notFoundAuthError');

const userSchema = new mongoose.Schema({
  email: {
    validate: {
      validator: (v) => validator.isEmail(v),
      message: 'Введен некорректный адрес почты',
    },
    type: String,
    required: true,
    unique: true,
  },
  password: {
    select: false,
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
}, { versionKey: false });

userSchema.statics.findUserByIdentity = function (email, password) {
  return this.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(
          new NotFoundAuth('Неправильные почта или пароль'),
        );
      }
      return bcrypt.compare(String(password), user.password).then((matched) => {
        if (!matched) {
          return Promise.reject(
            new NotFoundAuth('Неправильные почта или пароль'),
          );
        }
        return user;
      });
    });
};

userSchema.methods.toJSON = function () {
  const user = this.toObject();
  delete user.password;
  return user;
};

module.exports = mongoose.model('user', userSchema);
