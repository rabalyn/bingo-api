// Initializes the `liveusers` service on path `/liveusers`
const { Liveusers } = require('./liveusers.class')
const hooks = require('./liveusers.hooks')

module.exports = function (app) {
  const options = {
    paginate: app.get('paginate')
  }

  // Initialize our service with any options it requires
  app.use('/liveusers', new Liveusers(options, app))

  // Get our initialized service so that we can register hooks
  const service = app.service('liveusers')

  service.hooks(hooks)
}
