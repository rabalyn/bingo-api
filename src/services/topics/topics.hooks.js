
module.exports = {
  before: {
    all: [],
    find: [(context) => {
      context.params.query.$eager = context.params.query.$eager || '[words]'
    }],
    get: [(context) => {
      context.params.query.$eager = context.params.query.$eager || '[words]'
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
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
}
