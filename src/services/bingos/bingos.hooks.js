
module.exports = {
  before: {
    all: [],
    find: [(context) => {
      context.params.query.$eager = context.params.query.$eager || '[words, topics]'
    }],
    get: [(context) => {
      context.params.query.$eager = context.params.query.$eager || '[words, topics]'
    }],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
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
