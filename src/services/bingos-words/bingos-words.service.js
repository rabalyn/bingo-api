// Initializes the `bingos-words` service on path `/bingos-words`
const { BingosWords } = require('./bingos-words.class');
const createModel = require('../../models/bingos-words.model');
const hooks = require('./bingos-words.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/bingos-words', new BingosWords(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('bingos-words');

  service.hooks(hooks);
};
