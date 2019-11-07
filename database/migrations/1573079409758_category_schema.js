'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class CategorySchema extends Schema {
  up() {
    this.create('categories', table => {
      table.increments();
      table.string('name', 80).notNullable();
      table.string('slug', 80).notNullable();
      table.string('description', 255).notNullable();
      table.string('image', 255);
      table.boolean('is_active', 255);
      table.timestamps();
    });
  }

  down() {
    this.drop('categories');
  }
}

module.exports = CategorySchema;
