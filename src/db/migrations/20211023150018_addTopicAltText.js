const tableNames = require('../../lib/constants/tableNames')

exports.up = function (knex) {
  return knex.schema.table(tableNames.topics, (table) => {
    table.string('altText', 255)
  })
}

exports.down = function (knex) {
  return knex.schema.table(tableNames.topics, (table) => {
    table.dropColumn('altText')
  })
}
