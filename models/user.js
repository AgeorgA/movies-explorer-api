const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { default: isEmail } = require('validator/lib/isEmail');
const UnauthorisedError = require('../errors/Unauthorized');
const { message } = require('../utils/constants');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Поле name является обязательным'],
      minlength: [2, 'Минимальная длина 2 символа'],
      maxlength: [30, 'Максимальная длина 30 символов'],
    },
    email: {
      type: String,
      unique: true,
      required: [true, 'Поле email является обязательным'],
      validate: {
        validator: (v) => isEmail(v),
        message: 'Ошибка при вводе почты',
      },
    },
    password: {
      type: String,
      required: [true, 'Введите, пожалуйста, пароль'],
      select: false,
    },
  },
  { versionKey: false, timestamps: true },
);

userSchema.statics.findUserByCredentials = function findUserByCredentials(
  email,
  password,
) {
  return this.findOne({ email })
    .select('+password')
    .then((user) => {
      const error = message.loginValidMessage;
      if (!user) {
        return Promise.reject(new UnauthorisedError(error));
      }
      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          return Promise.reject(new UnauthorisedError(error));
        }
        return user;
      });
    });
};
module.exports = mongoose.model('user', userSchema);
