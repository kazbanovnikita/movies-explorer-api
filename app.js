/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-console */
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const helmet = require('helmet');
const router = require('./routes');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const cors = require('./middlewares/cors');
const defaultError = require('./middlewares/defaultErorr');

const app = express();

app.use(cors);
app.use(helmet());
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/bitfilmsdb');

app.use(requestLogger);

app.use(router);

app.use(errorLogger);

app.use(errors());
app.use(defaultError);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`listen port ${PORT}`);
});
