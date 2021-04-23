const tableNames = require('../../lib/constants/tableNames')

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex(tableNames.topics).del()
    .then(function () {
      // Inserts seed entries
      return knex(tableNames.topics).insert([
        { name: 'HRZ' },
        { name: 'Meeting' },
        { name: 'Hausversammlung' }
      ])
    })
}
