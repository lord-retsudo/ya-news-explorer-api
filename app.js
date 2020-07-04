require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const router = require('./routes/index');
const {
  PORT, DATABASE_URL,
} = require('./config');

const app = express();

const allowedCors = [
  'http://lord-retsudo.ru',
  'https://lord-retsudo.ru',
  'https://github.github.io',
  'http://localhost:8080',
];

const corsOptions = {
  origin: (origin, callback) => {
    const originIsAllowed = allowedCors.indexOf(origin) !== -1;
    callback(null, originIsAllowed);
  },
  credentials: true,
};

app.use(cors(corsOptions));

app.use((req, res, next) => {
  // console.log(req.body);

  if (req.headers.origin && allowedCors.includes(req.headers.origin)) {
    res.header('Access-Control-Allow-Origin', req.headers.origin);
  } else {
    res.header('Access-Control-Allow-Origin', 'https://github.github.io');
  }
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Methods', 'GET, POST, DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Authorization');
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(DATABASE_URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(requestLogger);

/*
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});
*/

app.use('/api', router);
app.use('/api', (req, res) => { res.status(404).json({ message: 'Запрашиваемый ресурс не найден' }); });

app.use(errorLogger);

app.use(errors());
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = statusCode === 500 ? 'На сервере произошла ошибка' : err.message;
  res.status(statusCode).send({ message });
  next();
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  // console.log(process.env.NODE_ENV);
});
