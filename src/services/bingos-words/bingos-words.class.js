const { Service } = require('feathers-objection')

exports.BingosWords = class BingosWords extends Service {
  constructor (options) {
    const { Model, ...otherOptions } = options

    super({
      ...otherOptions,
      model: Model
    })
  }
}
