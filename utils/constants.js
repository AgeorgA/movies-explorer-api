const http2 = require('http2');
require('dotenv').config();

const HTTP_STATUS = Object.fromEntries(
  Object.entries(http2.constants)
    .filter(([key]) => key.startsWith('HTTP_STATUS_'))
    .map(([key, value]) => [key.replace('HTTP_STATUS_', ''), value]),
);

const httpCheck = /^((ftp|http|https):\/\/)?(www\.)?([A-Za-zА-Яа-я0-9]{1}[A-Za-zА-Яа-я0-9-]*\.?)*\.{1}[A-Za-zА-Яа-я0-9-]{2,8}(\/([\w#!:.?+=&%@!\-/])*)?/;

const message = {
  BadRequestMessage: 'Переданы некорректные данные',
  ConflictMessage: 'Учетная запись уже существует',
  UpdateUserMessage: 'Переданы некорректные данные при обновлении профиля',
  CreateMovieMessage: 'Переданы некорректные данные при создании карточки',
  DeleteMovieMessage:
    'Вы не являетесь обладателем карточки, поэтому не можете ее удалить',
  unauthorizedMessage: 'Необходима авторизация',
  limiterMessage: 'Превышено количество запросов на сервер.',
  loginValidMessage: 'Неправильные почта или пароль',
  pageNotFoundMessage: 'Страница не найдена',
  NotFoundMessage: 'Не найдено',
};

const statusCode = {
  dataError: 400,
  authError: 401,
  accessIsDenied: 403,
  errorNotFound: 404,
  dataDublicate: 409,
  errorServer: 500,
  successDone: 200,
  successCreate: 201,
};

module.exports = {
  statusCode,
  message,
  httpCheck,

  HTTP_STATUS,
};
