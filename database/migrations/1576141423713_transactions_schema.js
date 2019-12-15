"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class TransactionsSchema extends Schema {
  up() {
    this.table("transactions", table => {
      table
        .integer("seller_id")
        .unsigned()
        .references("id")
        .inTable("sellers");
    });
  }

  down() {
    this.table("transactions", table => {
      // reverse alternations
    });
  }
}

module.exports = TransactionsSchema;
