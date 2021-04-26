const { AuthenticationService, JWTStrategy } = require('@feathersjs/authentication')
const { LocalStrategy } = require('@feathersjs/authentication-local')

const hooks = require('./authentication.hooks')

module.exports = app => {
  const authentication = new AuthenticationService(app)

  authentication.register('jwt', new JWTStrategy())
  authentication.register('local', new LocalStrategy())

  app.use('/authentication', authentication)

  const service = app.service('authentication')
  service.hooks(hooks)
}
