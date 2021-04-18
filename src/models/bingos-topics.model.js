// See https://vincit.github.io/objection.js/#models
// for more of what you can do here.
const { Model } = require('objection')
const tableNames = require('../lib/constants/tableNames')

class BingosTopics extends Model {
  static get tableName () {
    return tableNames.bingosTopics
  }

  static get jsonSchema () {
    return {
      type: 'object',
      required: [
        'bingos_id',
        'topics_id'
      ],

      properties: {
        bingos_id: { type: 'uuid' },
        topics_id: { type: 'uuid' }
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

    db.schema.hasTable(tableNames.bingosTopics).then(exists => {
      if (!exists) {
        db.schema.createTable(tableNames.bingosTopics, table => {
          table.increments('id')
          table.uuid('bingos_id')
          table.uuid('topics_id')
          table.timestamp('createdAt')
          table.timestamp('updatedAt')
        })
          .then(() => console.log(`Created ${tableNames.bingosTopics} table`)) // eslint-disable-line no-console
          .catch(e => console.error(`Error creating ${tableNames.bingosTopics} table`, e)) // eslint-disable-line no-console
      }
    })
      .catch(e => console.error(`Error creating ${tableNames.bingosTopics} table`, e)) // eslint-disable-line no-console
  }

  return BingosTopics
}
