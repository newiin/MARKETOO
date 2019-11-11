"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class SellersSchema extends Schema {
  up() {
    this.table("sellers", table => {
      table.string("company_name", 80);
      table.string("company_description", 255);
      table.string("address", 255);
      table.string("city", 80);
      table.string("state", 80);
      table.string("country", 80);
      table.string("phone", 80);
      table.string("company_logo", 225);
    });
  }

  down() {
    this.table("sellers", table => {
      // reverse alternations
    });
  }
}

module.exports = SellersSchema;
