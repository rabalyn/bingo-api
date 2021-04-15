// See https://vincit.github.io/objection.js/#models
// for more of what you can do here.
const { Model } = require('objection');

class Bingos extends Model {

  static get tableName() {
    return 'bingos';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['text'],

      properties: {
        text: { type: 'string' }
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

  db.schema.hasTable('bingos').then(exists => {
    if (!exists) {
      db.schema.createTable('bingos', table => {
        table.increments('id');
        table.string('text');
        table.timestamp('createdAt');
        table.timestamp('updatedAt');
      })
        .then(() => console.log('Created bingos table')) // eslint-disable-line no-console
        .catch(e => console.error('Error creating bingos table', e)); // eslint-disable-line no-console
    }
  })
    .catch(e => console.error('Error creating bingos table', e)); // eslint-disable-line no-console

  return Bingos;
};
