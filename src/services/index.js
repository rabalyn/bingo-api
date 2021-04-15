const users = require('./users/users.service.js');
const bingos = require('./bingos/bingos.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(users);
  app.configure(bingos);
};
