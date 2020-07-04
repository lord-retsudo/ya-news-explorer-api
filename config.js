const { NODE_ENV, JWT_SECRET_KEY, PORT } = process.env;
module.exports.PORT = PORT || 3000;
module.exports.DATABASE_URL = 'mongodb://localhost:27017/newsdb';
module.exports.JWT_SECRET_KEY = NODE_ENV === 'production' ? JWT_SECRET_KEY : 'some-secret-key';
