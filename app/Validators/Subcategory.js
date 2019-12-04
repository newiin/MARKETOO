"use strict";

class Subcategory {
  get rules() {
    return {
      name: "required|unique:subcategories",
      category: "required"
    };
  }

  get messages() {
    return {
      "name.required": "You must provide a Sub category",
      "name.unique": "This subcategory is already registered.",
      "category.required": "Select a valid category."
    };
  }
  get validateAll() {
    return true;
  }
}

module.exports = Subcategory;
