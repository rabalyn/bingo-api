const { authenticate } = require('@feathersjs/authentication').hooks

const {
  hashPassword, protect
} = require('@feathersjs/authentication-local').hooks

module.exports = {
  before: {
    all: [],
    find: [authenticate('jwt'), (context) => {
      context.params.query.$eager = context.params.query.$eager || '[bingos, rights]'
    }],
    get: [authenticate('jwt'), (context) => {
      context.params.query.$eager = context.params.query.$eager || '[bingos, rights]'
    }],
    create: [hashPassword('password')],
    update: [hashPassword('password'), authenticate('jwt')],
    patch: [hashPassword('password'), authenticate('jwt')],
    remove: [authenticate('jwt')]
  },

  after: {
    all: [
      // Make sure the password field is never sent to the client
      // Always must be the last hook
      protect('password')
    ],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [(context) => {
      console.error(context.error)
    }],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
}
