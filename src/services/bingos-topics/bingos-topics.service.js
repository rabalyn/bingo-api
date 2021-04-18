// Initializes the `bingos-topics` service on path `/bingos-topics`
const { BingosTopics } = require('./bingos-topics.class')
const createModel = require('../../models/bingos-topics.model')
const hooks = require('./bingos-topics.hooks')

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  }

  // Initialize our service with any options it requires
  app.use('/bingos-topics', new BingosTopics(options, app))

  // Get our initialized service so that we can register hooks
  const service = app.service('bingos-topics')

  service.hooks(hooks)
}
