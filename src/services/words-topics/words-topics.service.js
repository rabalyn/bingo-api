// Initializes the `words-topics` service on path `/words-topics`
const { WordsTopics } = require('./words-topics.class')
const createModel = require('../../models/words-topics.model')
const hooks = require('./words-topics.hooks')

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  }

  // Initialize our service with any options it requires
  app.use('/words-topics', new WordsTopics(options, app))

  // Get our initialized service so that we can register hooks
  const service = app.service('words-topics')

  service.hooks(hooks)
}
