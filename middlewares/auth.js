const jwt = require('jsonwebtoken');
const UnathorizedError = require('../errors/unathorizedError');

const { JWT_SECRET_KEY } = require('../config');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  try {
    if (!authorization || !authorization.startsWith('Bearer ')) throw new UnathorizedError('Необходима авторизация');

    const token = authorization.replace('Bearer ', '');
    const payload = jwt.verify(token, JWT_SECRET_KEY);

    if (!payload) throw new UnathorizedError('Необходима авторизация');

    req.user = payload;
  } catch (err) {
    next(err);
  }

  next();
};
