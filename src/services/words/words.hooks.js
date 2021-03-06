
module.exports = {
  before: {
    all: [],
    find: [(context) => {
      context.params.query.$eager = context.params.query.$eager || '[topics]'
    }],
    get: [(context) => {
      context.params.query.$eager = context.params.query.$eager || '[topics]'
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
