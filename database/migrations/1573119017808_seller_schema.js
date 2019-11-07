'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class SellerSchema extends Schema {
  up() {
    this.create('sellers', table => {
      table.increments();
      table.string('name', 80).notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop('sellers');
  }
}

module.exports = SellerSchema;
