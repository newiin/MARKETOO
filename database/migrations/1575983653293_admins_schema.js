"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class AdminsSchema extends Schema {
  up() {
    this.create("admins", table => {
      table.increments();
      table.string("first_name", 80);
      table.string("last_name", 80);
      table.string("position", 80);
      table.string("role", 80);
      table.timestamps();
    });
  }

  down() {
    this.drop("admins");
  }
}

module.exports = AdminsSchema;
