const users = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const { getUser } = require('../controllers/users');

users.get('/me', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().alphanum().length(24),
  }),
}), getUser);

module.exports = users;
