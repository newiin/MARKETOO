"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class CreditCardsSchema extends Schema {
  up() {
    this.create("credit_cards", table => {
      table.increments();
      table.string("type", 255).notNullable();
      table.integer("card_number");
      table.date("card_experation");
      table
        .integer("user_id")
        .unsigned()
        .references("id")
        .inTable("users")
        .nullable();
      table.timestamps();
    });
  }

  down() {
    this.drop("credit_cards");
  }
}

module.exports = CreditCardsSchema;
