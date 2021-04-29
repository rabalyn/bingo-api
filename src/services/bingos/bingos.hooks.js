const { discard } = require('feathers-hooks-common')

module.exports = {
  before: {
    all: [],
    find: [
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
