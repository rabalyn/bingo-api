// See https://vincit.github.io/objection.js/#models
// for more of what you can do here.
const { Model } = require('objection')
const tableNames = require('../lib/constants/tableNames')

class WordsTopics extends Model {
  static get tableName () {
    return tableNames.wordsTopics
  }

  static get jsonSchema () {
    return {
      type: 'object',
      required: [
        'words_id',
        'topics_id'
      ],

      properties: {
        words_id: { type: 'uuid' },
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

    db.schema.hasTable(tableNames.wordsTopics).then(exists => {
      if (!exists) {
        db.schema.createTable(tableNames.wordsTopics, table => {
          table.increments('id')
          table.uuid('words_id')
          table.uuid('topics_id')
          table.timestamp('createdAt')
          table.timestamp('updatedAt')
        })
          .then(() => console.log(`Created ${tableNames.wordsTopics} table`)) // eslint-disable-line no-console
          .catch(e => console.error(`Error creating ${tableNames.wordsTopics} table`, e)) // eslint-disable-line no-console
      }
    })
      .catch(e => console.error(`Error creating ${tableNames.wordsTopics} table`, e)) // eslint-disable-line no-console
  }

  return WordsTopics
}
