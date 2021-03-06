const mongoose = require('mongoose');
const validator = require('validator');

const articleSchema = new mongoose.Schema({
  keyword: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  source: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator(link) {
        return validator.isURL(link);
      },
      message: (link) => `${link.value} некорректный адрес!`,
    },
  },
  image: {
    type: String,
    required: true,
/*
    validate: {
      validator(link) {
        return validator.isURL(link);
      },
      message: (link) => `${link.value} некорректный адрес!`,
    },
*/
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    select: false,
  },
});

module.exports = mongoose.model('Article', articleSchema);
