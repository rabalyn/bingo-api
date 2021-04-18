const { Service } = require('feathers-objection')

exports.Topics = class Topics extends Service {
  constructor (options) {
    const { Model, ...otherOptions } = options

    super({
      ...otherOptions,
      model: Model
    })
  }
}
