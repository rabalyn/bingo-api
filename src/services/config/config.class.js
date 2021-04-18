const { Service } = require('feathers-objection')

exports.Config = class Config extends Service {
  constructor (options) {
    const { Model, ...otherOptions } = options

    super({
      ...otherOptions,
      model: Model
    })
  }
}
