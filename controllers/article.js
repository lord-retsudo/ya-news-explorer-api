const Article = require('../models/article');
const NotFoundError = require('../errors/notFoundError');
// const ForbiddenError = require('../errors/forbiddenError');

module.exports.getArticles = (req, res, next) => {
  Article.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(next);
};

module.exports.createArticle = (req, res, next) => {
  const {
    keyword, title, text, date, source, link, image,
  } = req.body;
  const owner = req.user._id;

  Article.create({
    keyword, title, text, date, source, link, image, owner,
  })
    .then((articles) => res.send({ data: articles }))
    .catch(next);
};

module.exports.deleteArticle = (req, res, next) => {
  Article.findOneAndRemove({
    _id: req.params.articleId,
    owner: req.user._id,
  })
    .orFail(() => new NotFoundError('Нет статьи с таким id или статья создана не вами'))
    .then(() => {
      res.send({ message: 'Статья была удалена' });
    })
    .catch(next);
};
