"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class CustomersSchema extends Schema {
  up() {
    this.table("customers", table => {
      table.string("address", 255);
      table.string("city", 80);
      table.string("state", 80);
      table.string("country", 80);
      table.string("phone", 80);
      table.string("billing_address", 255);
      table.string("billing_city", 80);
      table.string("billing_state", 80);
      table.string("billing_country", 80);
      table.string("shipping_address", 80);
      table.string("shipping_city", 80);
      table.string("shipping_state", 80);
      table.string("shipping_country", 80);
    });
  }

  down() {
    this.table("customers", table => {
      // reverse alternations
    });
  }
}

module.exports = CustomersSchema;
