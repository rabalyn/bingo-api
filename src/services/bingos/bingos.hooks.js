const { discard } = require('feathers-hooks-common')
const { authenticate } = require('@feathersjs/authentication')
const { setField } = require('feathers-authentication-hooks')

module.exports = {
  before: {
    all: [],
    find: [
      /*
      authenticate('jwt'),
      setField({
        from: 'params.user.id',
        as: 'params.query.user_id'
      }),
      */
      (context) => {
        console.log(context.params.user)
        console.log(context.params.query)
        context.params.query.$eager = context.params.query.$eager || '[words, topics, owner]'
      }
    ],
    get: [(context) => {
      context.params.query.$eager = context.params.query.$eager || '[words, topics, owner]'
    }],
    create: [discard('owner.password')],
    update: [discard('owner.password')],
    patch: [discard('owner.password')],
    remove: []
  },

  after: {
    all: [
      discard('owner.password')
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
