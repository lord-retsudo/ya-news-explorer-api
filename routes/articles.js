const articles = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getArticles, deleteArticle, createArticle,
} = require('../controllers/article');

articles.get('/', getArticles);

articles.delete('/:articleId', celebrate({
  params: Joi.object().keys({
    articleId: Joi.string().alphanum().length(24),
  }),
}), deleteArticle);

articles.post('/', celebrate({
  body: Joi.object().keys({
    keyword: Joi.string().required(),
    title: Joi.string().required(),
    text: Joi.string().required(),
    date: Joi.string().required(),
    source: Joi.string().required(),
    link: Joi.string().uri().required(),
    image: Joi.string().required(),
  }),
}), createArticle);

module.exports = articles;
