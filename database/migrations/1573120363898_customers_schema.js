'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class CustomersSchema extends Schema {
  up() {
    this.table('customers', table => {
      table.string('address', 255).notNullable();
      table.string('city', 80).notNullable();
      table.string('state', 80);
      table.string('country', 80).notNullable();
      table.string('phone', 80).notNullable();
      table
        .integer('credit_card_type_id')
        .unsigned()
        .references('id')
        .inTable('credit_card_types');
      table.integer('card_number');
      table.date('card_experation');
      table.string('billing_address', 80);
      table.string('billing_city', 80);
      table.string('billing_state', 80);
      table.string('billing_country', 80);
      table.string('shipping_address', 80);
      table.string('shipping_city', 80);
      table.string('shipping_state', 80);
      table.string('shipping_country', 80);
    });
  }

  down() {
    this.table('customers', table => {
      // reverse alternations
    });
  }
}

module.exports = CustomersSchema;
