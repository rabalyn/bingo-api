// Initializes the `words` service on path `/words`
const { Words } = require('./words.class')
const createModel = require('../../models/words.model')
const hooks = require('./words.hooks')

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate'),
    whitelist: ['$eager', '$ilike'],
    allowedEager: ['topics'],
    allowedUpsert: '[topics]',
    upsertGraphOptions: {
      relate: true,
      unrelate: true,
      noUnrelate: true
    }
  }

  // Initialize our service with any options it requires
  app.use('/words', new Words(options, app))

  // Get our initialized service so that we can register hooks
  const service = app.service('words')

  service.hooks(hooks)
}
