"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Subcategory extends Model {
  products() {
    return this.hasMany("App/Models/Product");
  }
  category() {
    return this.belongsTo("App/Models/Category");
  }
}

module.exports = Subcategory;
