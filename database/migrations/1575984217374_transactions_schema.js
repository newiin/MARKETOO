"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class TransactionsSchema extends Schema {
  up() {
    this.create("transactions", table => {
      table.increments();
      table
        .integer("order_id")
        .unsigned()
        .references("id")
        .inTable("orders");
      table
        .integer("seller_id")
        .unsigned()
        .references("id")
        .inTable("sellers");

      table.integer("product_id").notNullable();
      table.string("title", 80).notNullable();
      table.integer("qty").notNullable();
      table.integer("price").notNullable();
      table.string("image").notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop("transactions");
  }
}

module.exports = TransactionsSchema;
