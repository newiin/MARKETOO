'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class CreditCardTypesSchema extends Schema {
  up() {
    this.create('credit_card_types', table => {
      table.increments();
      table.string('type', 255).notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop('credit_card_types');
  }
}

module.exports = CreditCardTypesSchema;
