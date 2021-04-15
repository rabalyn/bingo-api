// See https://vincit.github.io/objection.js/#models
// for more of what you can do here.
const { Model } = require('objection');
const tableNames = require('../lib/constants/tableNames')

class Words extends Model {

  static get tableName() {
    return tableNames.words;
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['word'],

      properties: {
        word: 'string'
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
  if (app) {
    const db = app.get('knex');

    db.schema.hasTable(tableNames.words).then(exists => {
      if (!exists) {
        db.schema.createTable(tableNames.words, table => {
          table.increments('id');
          table.string('word');
          table.timestamp('createdAt');
          table.timestamp('updatedAt');
        })
          .then(() => console.log(`Created ${tableNames.words} table`)) // eslint-disable-line no-console
          .catch(e => console.error(`Error creating ${tableNames.words} table`, e)); // eslint-disable-line no-console
      }
    })
      .catch(e => console.error(`Error creating ${tableNames.words} table`, e)); // eslint-disable-line no-console
  }

  return Words;
};
