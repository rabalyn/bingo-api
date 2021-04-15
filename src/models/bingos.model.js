// See https://vincit.github.io/objection.js/#models
// for more of what you can do here.
const { Model } = require('objection');
const tableNames = require('../lib/constants/tableNames')

class Bingos extends Model {

  static get tableName() {
    return tableNames.bingos;
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

  static get relationMappings() {
    const Words = require('./words.model')();

    return {
      words: {
        relation: Model.ManyToManyRelation,
        modelClass: Words,
        join: {
          from: `${tableNames.bingos}.id`,
          through: {
            from: `${tableNames.bingosWords}.bingo_id`,
            to: `${tableNames.bingosWords}.word_id`
          },
          to: `${tableNames.words}.id`
        }
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

  db.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";')

  db.schema.hasTable(tableNames.bingos).then(exists => {
    if (!exists) {
      db.schema.createTable(tableNames.bingos, table => {
        table.increments('id');
        table.uuid('setid').defaultTo(db.raw('uuid_generate_v4()'));
        table.string('text');
        table.string('categories');
        table.timestamp('createdAt');
        table.timestamp('updatedAt');
      })
        .then(() => console.log(`Created ${tableNames.bingos} table`)) // eslint-disable-line no-console
        .catch(e => console.error(`Error creating ${tableNames.bingos} table`, e)); // eslint-disable-line no-console
    }
  })
    .catch(e => console.error(`Error creating ${tableNames.bingos} table`, e)); // eslint-disable-line no-console

  return Bingos;
};
