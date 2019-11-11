"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class SellerSchema extends Schema {
  up() {
    this.create("sellers", table => {
      table.increments();
      table.string("first_name", 80);
      table.string("last_name", 80);

      table.timestamps();
    });
  }

  down() {
    this.drop("sellers");
  }
}

module.exports = SellerSchema;
