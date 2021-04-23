const bcrypt = require('bcryptjs')

const tableNames = require('../../lib/constants/tableNames')

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex(tableNames.users).del()
    .then(function () {
      // Inserts seed entries
      return knex(tableNames.users).insert([
        {
          name: 'admin',
          password: bcrypt.hashSync('admin', 10),
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'operator',
          password: bcrypt.hashSync('operator', 10),
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ])
    })
}
