require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const { MONGO_URL, PORT } = require('./utils/config');
const router = require('./router/index');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const limiter = require('./middlewares/rateLimiter');
const serverError = require('./middlewares/serverError');

const app = express();
app.use(cors());
app.use(limiter);
app.use(helmet());
app.use(bodyParser.json());
app.use(express.json());
app.use(requestLogger);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(router);
app.use(errorLogger);
app.use(errors());

app.use(serverError);

async function init() {
  await mongoose.connect(MONGO_URL);
  await app.listen(PORT);
}
init();
