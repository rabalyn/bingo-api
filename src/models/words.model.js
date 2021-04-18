// See https://vincit.github.io/objection.js/#models
// for more of what you can do here.
const { Model } = require('objection')
const tableNames = require('../lib/constants/tableNames')

class Words extends Model {
  static get tableName () {
    return tableNames.words
  }

  static get jsonSchema () {
    return {
      type: 'object',
      required: [
        'name'
      ],

      properties: {
        name: { type: 'string', minLength: 2, maxLength: 255 }
      }
    }
  }

  static get relationMappings () {
    const Topics = require('./topics.model')()

    return {
      topics: {
        relation: Model.ManyToManyRelation,
        modelClass: Topics,
        join: {
          from: `${tableNames.words}.id`,
          through: {
            from: `${tableNames.wordsTopics}.words_id`,
            to: `${tableNames.wordsTopics}.topics_id`
          },
          to: `${tableNames.topics}.id`
        }
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

    db.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";')

    db.schema.hasTable(tableNames.words).then(exists => {
      if (!exists) {
        db.schema.createTable(tableNames.words, table => {
          table.uuid('id').defaultTo(db.raw('uuid_generate_v4()'))
          table.string('name', 255)
          table.timestamp('createdAt')
          table.timestamp('updatedAt')
        })
          .then(() => console.log(`Created ${tableNames.words} table`)) // eslint-disable-line no-console
          .catch(e => console.error(`Error creating ${tableNames.words} table`, e)) // eslint-disable-line no-console
      }
    })
      .catch(e => console.error(`Error creating ${tableNames.words} table`, e)) // eslint-disable-line no-console
  }

  return Words
}
