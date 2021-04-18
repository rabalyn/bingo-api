// Initializes the `users-rights` service on path `/users-rights`
const { UsersRights } = require('./users-rights.class')
const createModel = require('../../models/users-rights.model')
const hooks = require('./users-rights.hooks')

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  }

  // Initialize our service with any options it requires
  app.use('/users-rights', new UsersRights(options, app))

  // Get our initialized service so that we can register hooks
  const service = app.service('users-rights')

  service.hooks(hooks)
}
