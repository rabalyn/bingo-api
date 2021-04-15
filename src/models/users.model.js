// See https://vincit.github.io/objection.js/#models
// for more of what you can do here.
const { Model } = require('objection');
const tableNames = require('../lib/constants/tableNames')

class Users extends Model {

  static get tableName() {
    return tableNames.users;
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['username', 'password'],

      properties: {
        username: { type: ['string', 'null'] },
        password: 'string',
      }
    };
  }

  $beforeInsert() {
    this.createdAt = this.updatedAt = new Date().toISOString();
  }

  $beforeUpdate() {
    this.updatedAt = new Date().toISOString();
  }
}

module.exports = function (app) {
  const db = app.get('knex');

  db.schema.hasTable(tableNames.users).then(exists => {
    if (!exists) {
      db.schema.createTable(tableNames.users, table => {
        table.increments('id');
      
        table.string('email').unique();
        table.string('username');
      
        table.timestamp('createdAt');
        table.timestamp('updatedAt');
      })
        .then(() => console.log(`Created ${tableNames.users} table`)) // eslint-disable-line no-console
        .catch(e => console.error(`Error creating ${tableNames.users} table`, e)); // eslint-disable-line no-console
    }
  })
    .catch(e => console.error(`Error creating ${tableNames.users} table`, e)); // eslint-disable-line no-console

  return Users;
};
