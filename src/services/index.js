const users = require('./users/users.service.js')
const bingos = require('./bingos/bingos.service.js')
const words = require('./words/words.service.js')
const bingosWords = require('./bingos-words/bingos-words.service.js')
const topics = require('./topics/topics.service.js')
const bingosTopics = require('./bingos-topics/bingos-topics.service.js')
const rights = require('./rights/rights.service.js')
const wordsTopics = require('./words-topics/words-topics.service.js')
const usersRights = require('./users-rights/users-rights.service.js')
const config = require('./config/config.service.js')
const liveusers = require('./liveusers/liveusers.service.js');
const gamestate = require('./gamestate/gamestate.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(users)
  app.configure(bingos)
  app.configure(words)
  app.configure(bingosWords)
  app.configure(topics)
  app.configure(bingosTopics)
  app.configure(rights)
  app.configure(wordsTopics)
  app.configure(usersRights)
  app.configure(config)
  app.configure(liveusers);
  app.configure(gamestate);
}
