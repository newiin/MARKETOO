"use strict";

class Category {
  get rules() {
    return {
      name: "required|unique:categories",
      description: "required"
    };
  }

  get messages() {
    return {
      "name.required": "You must provide a category",
      "name.unique": "This category is already registered.",
      "description.required": "Provide a description for the category."
    };
  }
  get validateAll() {
    return true;
  }
}

module.exports = Category;
