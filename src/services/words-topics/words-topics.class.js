const { Service } = require('feathers-objection')

exports.WordsTopics = class WordsTopics extends Service {
  constructor (options) {
    const { Model, ...otherOptions } = options

    super({
      ...otherOptions,
      model: Model
    })
  }
}
