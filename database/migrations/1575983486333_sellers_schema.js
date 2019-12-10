"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class SellersSchema extends Schema {
  up() {
    this.create("sellers", table => {
      table.increments();
      table.string("first_name", 80);
      table.string("last_name", 80);
      table.string("company_name", 80);
      table.string("company_description", 255);
      table.string("address", 255);
      table.string("city", 80);
      table.string("state", 80);
      table.string("country", 80);
      table.string("phone", 80);
      table.string("company_logo", 225);
      table.timestamps();
    });
  }

  down() {
    this.drop("sellers");
  }
}

module.exports = SellersSchema;
