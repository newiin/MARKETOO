'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class SubcategorySchema extends Schema {
  up() {
    this.create('subcategories', table => {
      table.increments();
      table
        .integer('cayegory_id')
        .unsigned()
        .references('id')
        .inTable('categories');
      table.string('name', 80).notNullable();
      table.string('slug', 80).notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop('subcategories');
  }
}

module.exports = SubcategorySchema;
