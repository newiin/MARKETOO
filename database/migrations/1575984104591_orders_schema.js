"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class OrdersSchema extends Schema {
  up() {
    this.create("orders", table => {
      table.increments();
      table
        .integer("customer_id")
        .unsigned()
        .references("id")
        .inTable("customers");

      table
        .integer("seller_id")
        .unsigned()
        .references("id")
        .inTable("sellers");

      table.integer("total").notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop("orders");
  }
}

module.exports = OrdersSchema;
