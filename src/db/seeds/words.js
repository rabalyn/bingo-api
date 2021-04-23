const tableNames = require('../../lib/constants/tableNames')

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex(tableNames.words).del()
    .then(function () {
      // Inserts seed entries
      return knex(tableNames.words).insert([
        { name: 'Ziele' },
        { name: 'Strategie' },
        { name: 'Cloud' },
        { name: '*Stimme CB* HAHAHA' },
        { name: 'transparente Kommunikation' },
        { name: 'Servicekatalog' },
        { name: 'NFDI' },
        { name: 'Aachen' },
        { name: 'Gießen' },
        { name: 'Taskforce' },
        { name: 'Flughöhe' },
        { name: 'bewusst nicht technische GF' },
        { name: 'SPOC' },
        { name: 'Inventur' },
        { name: 'mehr Stäbe' },
        { name: 'kein Geld für Personal' },
        { name: 'Sparen und mehr Services' },
        { name: 'so viele Meetings' },
        { name: 'mehr extern einkaufen' },
        { name: 'Digitalisierung' },
        { name: 'UC' },
        { name: 'vor 09:00 Uhr' },
        { name: 'Projektmanagement' },
        { name: 'Stellenabbau' },
        { name: 'Wer braucht die AL?' }
      ])
    })
}
