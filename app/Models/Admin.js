"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Admin extends Model {
  static get traits() {
    return ["@provider:Morphable"];
  }
  user() {
    return this.morphOne(
      "App/Models/User",
      "id",
      "userable_id",
      "userable_type"
    );
  }
}

module.exports = Admin;
