// See https://vincit.github.io/objection.js/#models
// for more of what you can do here.
const { Model } = require('objection')
const tableNames = require('../lib/constants/tableNames')

class UsersRights extends Model {
  static get tableName () {
    return tableNames.usersRights
  }

  static get jsonSchema () {
    return {
      type: 'object',
      required: [
        'users_id',
        'rights_id'
      ],

      properties: {
        users_id: { type: 'uuid' },
        rights_id: { type: 'uuid' }
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

    db.schema.hasTable(tableNames.usersRights).then(exists => {
      if (!exists) {
        db.schema.createTable(tableNames.usersRights, table => {
          table.increments('id')
          table.uuid('users_id')
          table.uuid('rights_id')
          table.timestamp('createdAt')
          table.timestamp('updatedAt')
        })
          .then(() => console.log(`Created ${tableNames.usersRights} table`)) // eslint-disable-line no-console
          .catch(e => console.error(`Error creating ${tableNames.usersRights} table`, e)) // eslint-disable-line no-console
      }
    })
      .catch(e => console.error(`Error creating ${tableNames.usersRights} table`, e)) // eslint-disable-line no-console
  }

  return UsersRights
}
