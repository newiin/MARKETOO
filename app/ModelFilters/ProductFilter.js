"use strict";

const ModelFilter = use("ModelFilter");

class ProductFilter extends ModelFilter {
  subcategory(id) {
    return this.whereIn("subcategory_id", id);
  }
}

module.exports = ProductFilter;
