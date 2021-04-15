const users = require('./users/users.service.js');
const bingos = require('./bingos/bingos.service.js');
const words = require('./words/words.service.js');
const bingosWords = require('./bingos-words/bingos-words.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(users);
  app.configure(bingos);
  app.configure(words);
  app.configure(bingosWords);
};
