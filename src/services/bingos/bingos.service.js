// Initializes the `bingos` service on path `/bingos`
const { Bingos } = require('./bingos.class');
const createModel = require('../../models/bingos.model');
const hooks = require('./bingos.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate'),
    whitelist: ['$eager'],
    allowedEager: 'words',
    allowedUpsert: 'words'
  };

  // Initialize our service with any options it requires
  app.use('/bingos', new Bingos(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('bingos');

  service.hooks(hooks);
};
