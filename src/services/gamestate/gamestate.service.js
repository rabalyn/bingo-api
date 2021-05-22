// Initializes the `gamestate` service on path `/gamestate`
const { Gamestate } = require('./gamestate.class')
const hooks = require('./gamestate.hooks')

module.exports = function (app) {
  const options = {
    paginate: app.get('paginate')
  }

  // Initialize our service with any options it requires
  app.use('/gamestate', new Gamestate(options, app.get('redis')))

  // Get our initialized service so that we can register hooks
  const service = app.service('gamestate')

  service.hooks(hooks)
}
