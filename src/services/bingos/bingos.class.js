const { Service } = require('feathers-objection');

exports.Bingos = class Bingos extends Service {
  constructor(options) {
    const { Model, ...otherOptions } = options;

    super({
      ...otherOptions,
      model: Model
    });
  }
};
