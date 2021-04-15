// See https://vincit.github.io/objection.js/#models
// for more of what you can do here.
const { Model } = require('objection');
const tableNames = require('../lib/constants/tableNames')

class BingosWords extends Model {

  static get tableName() {
    return tableNames.bingosWords;
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: [
        'bingo_id',
        'word_id'
      ],

      properties: {
        bingo_id: 'integer',
        word_id: 'integer'
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

  db.schema.hasTable(tableNames.bingosWords).then(exists => {
    if (!exists) {
      db.schema.createTable(tableNames.bingosWords, table => {
        table.increments('id');
        table.integer('bingo_id');
        table.integer('word_id');
        table.timestamp('createdAt');
        table.timestamp('updatedAt');
      })
        .then(() => console.log(`Created ${tableNames.bingosWords} table`)) // eslint-disable-line no-console
        .catch(e => console.error(`Error creating ${tableNames.bingosWords} table`, e)); // eslint-disable-line no-console
    }
  })
    .catch(e => console.error(`Error creating ${tableNames.bingosWords} table`, e)); // eslint-disable-line no-console

  return BingosWords;
};
