"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class ProductsSchema extends Schema {
  up() {
    this.table("products", table => {
      table.string("slug", 255).notNullable();
    });
  }

  down() {
    this.table("products", table => {
      // reverse alternations
    });
  }
}

module.exports = ProductsSchema;
