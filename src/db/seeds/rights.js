const tableNames = require('../../lib/constants/tableNames')

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex(tableNames.rights).del()
    .then(function () {
      // Inserts seed entries
      return knex(tableNames.rights).insert([
        { name: 'isAdmin' },
        { name: 'isUser' }
      ])
    })
}
