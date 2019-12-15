"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");
const ProductFilter = use("App/ModelFilters/ProductFilter");
class Product extends Model {
  static boot() {
    super.boot();
    this.addTrait("@provider:Filterable", ProductFilter);
  }
  images() {
    return this.hasMany("App/Models/Image");
  }
  subcategory() {
    return this.belongsTo("App/Models/Subcategory");
  }
  seller() {
    return this.belongsTo("App/Models/Seller");
  }
}

module.exports = Product;
