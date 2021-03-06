"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Seller extends Model {
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
  products() {
    return this.hasMany("App/Models/Product");
  }
  orders() {
    return this.hasMany("App/Models/Order");
  }
  transactions() {
    return this.hasMany("App/Models/Transaction");
  }
}

module.exports = Seller;
