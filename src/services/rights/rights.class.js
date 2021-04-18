const { Service } = require('feathers-objection')

exports.Rights = class Rights extends Service {
  constructor (options) {
    const { Model, ...otherOptions } = options

    super({
      ...otherOptions,
      model: Model
    })
  }
}
