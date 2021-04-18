const { Service } = require('feathers-objection')

exports.UsersRights = class UsersRights extends Service {
  constructor (options) {
    const { Model, ...otherOptions } = options

    super({
      ...otherOptions,
      model: Model
    })
  }
}
