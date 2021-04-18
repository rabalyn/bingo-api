// See https://vincit.github.io/objection.js/#models
// for more of what you can do here.
const { Model } = require('objection')
const tableNames = require('../lib/constants/tableNames')

class Config extends Model {
  static get tableName () {
    return tableNames.config
  }

  static get jsonSchema () {
    return {
      type: 'object',
      required: [
        'key',
        'val'
      ],

      properties: {
        key: { type: 'string', minLength: 3, maxLength: 255 },
        val: { type: 'string', minLength: 3, maxLength: 255 }
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

    db.schema.hasTable(tableNames.config).then(exists => {
      if (!exists) {
        db.schema.createTable(tableNames.config, table => {
          table.increments('id')
          table.string('key', 127)
          table.string('val', 127)
          table.timestamp('createdAt')
          table.timestamp('updatedAt')
        })
          .then(() => console.log(`Created ${tableNames.config} table`)) // eslint-disable-line no-console
          .catch(e => console.error(`Error creating ${tableNames.config} table`, e)) // eslint-disable-line no-console
      }
    })
      .catch(e => console.error(`Error creating ${tableNames.config} table`, e)) // eslint-disable-line no-console
  }

  return Config
}
