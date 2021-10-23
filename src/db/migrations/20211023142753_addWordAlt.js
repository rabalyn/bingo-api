const tableNames = require('../../lib/constants/tableNames')

exports.up = function (knex) {
  return knex.schema.table(tableNames.words, (table) => {
    table.string('altText', 255)
  })
}

exports.down = function (knex) {
  return knex.schema.table(tableNames.words, (table) => {
    table.dropColumn('altText')
  })
}
