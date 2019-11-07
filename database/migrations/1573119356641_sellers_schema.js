'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class SellersSchema extends Schema {
  up() {
    this.table('sellers', table => {
      table.string('company_name', 80).notNullable();
      table.string('address', 255).notNullable();
      table.string('city', 80).notNullable();
      table.string('state', 80);
      table.string('country', 80).notNullable();
      table.string('phone', 80).notNullable();
      table.string('company_logo', 225);
    });
  }

  down() {
    this.table('sellers', table => {
      // reverse alternations
    });
  }
}

module.exports = SellersSchema;
