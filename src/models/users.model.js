// See https://vincit.github.io/objection.js/#models
// for more of what you can do here.
const { Model } = require('objection')
const tableNames = require('../lib/constants/tableNames')

class Users extends Model {
  static get tableName () {
    return tableNames.users
  }

  static get jsonSchema () {
    return {
      type: 'object',
      required: [
        'name',
        'password'
      ],

      properties: {
        name: { type: 'string', minLength: 3, maxLength: 255 },
        password: { type: 'string', minLength: 3, maxLength: 255 }
      }
    }
  }

  static get relationMappings () {
    const Rights = require('./rights.model')()

    return {
      rights: {
        relation: Model.ManyToManyRelation,
        modelClass: Rights,
        join: {
          from: `${tableNames.users}.id`,
          through: {
            from: `${tableNames.usersRights}.users_id`,
            to: `${tableNames.usersRights}.rights_id`
          },
          to: `${tableNames.rights}.id`
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

    db.schema.hasTable(tableNames.users).then(exists => {
      if (!exists) {
        db.schema.createTable(tableNames.users, table => {
          table.uuid('id').defaultTo(db.raw('uuid_generate_v4()'))
          table.string('name', 255).unique()
          table.string('password', 255)
          table.timestamp('createdAt')
          table.timestamp('updatedAt')
        })
          .then(() => console.log(`Created ${tableNames.users} table`)) // eslint-disable-line no-console
          .catch(e => console.error(`Error creating ${tableNames.users} table`, e)) // eslint-disable-line no-console
      }
    })
      .catch(e => console.error(`Error creating ${tableNames.users} table`, e)) // eslint-disable-line no-console
  }

  return Users
}
