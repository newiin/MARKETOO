"use strict";

const ModelFilter = use("ModelFilter");

class ProductFilter extends ModelFilter {
  subcategory(id) {
    return this.whereIn("subcategory_id", id);
  }
  price() {
    return this.where("price", ">", 1000);
  }
}

module.exports = ProductFilter;
