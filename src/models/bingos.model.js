// See https://vincit.github.io/objection.js/#models
// for more of what you can do here.
const { Model } = require('objection')
const tableNames = require('../lib/constants/tableNames')

class Bingos extends Model {
  static get tableName () {
    return tableNames.bingos
  }

  static get jsonSchema () {
    return {
      type: 'object',
      required: [
        'name',
        'description'
      ],

      properties: {
        name: { type: 'string', minLength: 2, maxLength: 255 },
        description: { type: 'string', minLength: 5, maxLength: 1023 }
      }
    }
  }

  static get relationMappings () {
    const Words = require('./words.model')()
    const Topics = require('./topics.model')()
    const Users = require('./users.model')()

    return {
      words: {
        relation: Model.ManyToManyRelation,
        modelClass: Words,
        join: {
          from: `${tableNames.bingos}.id`,
          through: {
            from: `${tableNames.bingosWords}.bingos_id`,
            to: `${tableNames.bingosWords}.words_id`
          },
          to: `${tableNames.words}.id`
        }
      },
      topics: {
        relation: Model.ManyToManyRelation,
        modelClass: Topics,
        join: {
          from: `${tableNames.bingos}.id`,
          through: {
            from: `${tableNames.bingosTopics}.bingos_id`,
            to: `${tableNames.bingosTopics}.topics_id`
          },
          to: `${tableNames.topics}.id`
        }
      },
      owner: {
        relation: Model.BelongsToOneRelation,
        modelClass: Users,
        join: {
          from: `${tableNames.bingos}.user_id`,
          to: `${tableNames.users}.id`
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

    db.schema.hasTable(tableNames.bingos).then(exists => {
      if (!exists) {
        db.schema.createTable(tableNames.bingos, table => {
          table.uuid('id').defaultTo(db.raw('uuid_generate_v4()'))
          table.uuid('user_id')
          table.boolean('is_private').defaultTo(false)
          table.string('name', 255)
          table.string('description', 1023)
          table.timestamp('createdAt')
          table.timestamp('updatedAt')
        })
          .then(() => console.log(`Created ${tableNames.bingos} table`)) // eslint-disable-line no-console
          .catch(e => console.error(`Error creating ${tableNames.bingos} table`, e)) // eslint-disable-line no-console
      }
    })
      .catch(e => console.error(`Error creating ${tableNames.bingos} table`, e)) // eslint-disable-line no-console
  }

  return Bingos
}
