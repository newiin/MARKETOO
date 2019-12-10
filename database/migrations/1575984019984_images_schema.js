"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class ImagesSchema extends Schema {
  up() {
    this.create("images", table => {
      table.increments();
      table
        .integer("product_id")
        .unsigned()
        .references("id")
        .inTable("products")
        .onDelete("CASCADE");
      table.string("image").defaultTo("image link");
      table.string("url", 255);
      table.timestamps();
    });
  }

  down() {
    this.drop("images");
  }
}

module.exports = ImagesSchema;
