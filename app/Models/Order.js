"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Order extends Model {
  transactions() {
    return this.hasMany("App/Models/Transaction");
  }
  customner() {
    return this.belongsTo("App/Models/Customer");
  }
}

module.exports = Order;
