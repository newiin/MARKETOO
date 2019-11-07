'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class CustomerSchema extends Schema {
  up() {
    this.create('customers', table => {
      table.increments();
      table.string('name', 80).notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop('customers');
  }
}

module.exports = CustomerSchema;
