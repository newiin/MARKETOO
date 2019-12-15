"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Transaction extends Model {
  order() {
    return this.belongsTo("App/Models/Order");
  }
  seller() {
    return this.belongsTo("App/Models/Seller");
  }
  customer() {
    return this.belongsTo("App/Models/Customer");
  }
}

module.exports = Transaction;
