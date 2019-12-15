'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TransactionsSchema extends Schema {
  up () {
    this.table('transactions', (table) => {
      // alter table
    })
  }

  down () {
    this.table('transactions', (table) => {
      // reverse alternations
    })
  }
}

module.exports = TransactionsSchema
