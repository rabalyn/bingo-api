// See https://vincit.github.io/objection.js/#models
// for more of what you can do here.
const { Model } = require('objection')
const tableNames = require('../lib/constants/tableNames')

class Topics extends Model {
  static get tableName () {
    return tableNames.topics
  }

  static get jsonSchema () {
    return {
      type: 'object',
      required: [
        'name'
      ],

      properties: {
        name: { type: 'string', minLength: 3, maxLength: 255 }
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

module.exports = async function (app) {
  if (app) {
    const db = app.get('knex')

    await db.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";')

    db.schema.hasTable(tableNames.topics).then(exists => {
      if (!exists) {
        db.schema.createTable(tableNames.topics, table => {
          table.uuid('id').defaultTo(db.raw('uuid_generate_v4()'))
          table.string('name', 255)
          table.timestamp('createdAt')
          table.timestamp('updatedAt')
        })
          .then(() => console.log(`Created ${tableNames.topics} table`)) // eslint-disable-line no-console
          .catch(e => console.error(`Error creating ${tableNames.topics} table`, e)) // eslint-disable-line no-console
      }
    })
      .catch(e => console.error(`Error creating ${tableNames.topics} table`, e)) // eslint-disable-line no-console
  }

  return Topics
}
