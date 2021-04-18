const { Service } = require('feathers-objection')

exports.BingosTopics = class BingosTopics extends Service {
  constructor (options) {
    const { Model, ...otherOptions } = options

    super({
      ...otherOptions,
      model: Model
    })
  }
}
