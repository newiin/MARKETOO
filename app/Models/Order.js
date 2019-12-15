"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Order extends Model {
  transactions() {
    return this.hasMany("App/Models/Transaction");
  }
  customer() {
    return this.belongsTo("App/Models/Customer");
  }
  seller() {
    return this.belongsTo("App/Models/Seller");
  }
}

module.exports = Order;
