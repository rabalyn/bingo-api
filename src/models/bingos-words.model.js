// See https://vincit.github.io/objection.js/#models
// for more of what you can do here.
const { Model } = require('objection')
const tableNames = require('../lib/constants/tableNames')

class BingosWords extends Model {
  static get tableName () {
    return tableNames.bingosWords
  }

  static get jsonSchema () {
    return {
      type: 'object',
      required: [
        'bingos_id',
        'words_id'
      ],

      properties: {
        bingos_id: { type: 'uuid' },
        words_id: { type: 'uuid' }
      }
    }
  }

  $beforeInsert () {
    this.createdAt = this.updatedAt = new Date().toISOString()
  }

  $beforeUpdate () {
    this.updatedAt = new Date().toISOString()
  }
}

module.exports = function (app) {
  if (app) {
    const db = app.get('knex')

    db.schema.hasTable(tableNames.bingosWords).then(exists => {
      if (!exists) {
        db.schema.createTable(tableNames.bingosWords, table => {
          table.increments('id')
          table.uuid('bingos_id')
          table.uuid('words_id')
          table.timestamp('createdAt')
          table.timestamp('updatedAt')
        })
          .then(() => console.log(`Created ${tableNames.bingosWords} table`)) // eslint-disable-line no-console
          .catch(e => console.error(`Error creating ${tableNames.bingosWords} table`, e)) // eslint-disable-line no-console
      }
    })
      .catch(e => console.error(`Error creating ${tableNames.bingosWords} table`, e)) // eslint-disable-line no-console
  }

  return BingosWords
}
