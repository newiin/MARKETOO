"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class ProductsSchema extends Schema {
  up() {
    this.create("products", table => {
      table.increments();
      table
        .integer("subcategory_id")
        .unsigned()
        .references("id")
        .inTable("subcategories");

      table
        .integer("seller_id")
        .unsigned()
        .references("id")
        .inTable("sellers")
        .onDelete("CASCADE");
      table.string("title", 225).notNullable();
      table.string("description", 225).notNullable();
      table.string("price", 225).notNullable();
      table.integer("quantity").notNullable();
      table.boolean("is_available").defaultTo(true);
      table.boolean("is_achieved").defaultTo(false);
      table.timestamps();
    });
  }

  down() {
    this.drop("products");
  }
}

module.exports = ProductsSchema;
