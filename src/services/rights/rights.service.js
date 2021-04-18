// Initializes the `rights` service on path `/rights`
const { Rights } = require('./rights.class')
const createModel = require('../../models/rights.model')
const hooks = require('./rights.hooks')

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  }

  // Initialize our service with any options it requires
  app.use('/rights', new Rights(options, app))

  // Get our initialized service so that we can register hooks
  const service = app.service('rights')

  service.hooks(hooks)
}
