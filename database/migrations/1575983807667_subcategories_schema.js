"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class SubcategoriesSchema extends Schema {
  up() {
    this.create("subcategories", table => {
      table.increments();
      table
        .integer("category_id")
        .unsigned()
        .references("id")
        .inTable("categories")
        .onDelete("CASCADE");
      table.string("name", 80).notNullable();
      table.string("slug", 80).notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop("subcategories");
  }
}

module.exports = SubcategoriesSchema;
