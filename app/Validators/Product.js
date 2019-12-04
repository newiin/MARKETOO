"use strict";

class Product {
  get rules() {
    return {
      title: "required",
      quantity: "required|integer",
      subcategory: "required",
      price: "required",
      description: "required"
    };
  }

  get messages() {
    return {
      "subcategory.required": "Choose a category for the product ",
      "title.required": "The title required.",
      "price.required": "Provide the price for the  product.",
      "description.required": "Provide a description for the product.",
      "quantity.required": "Provide the quantity available for the product.",
      "quantity.integer": "The quantity must be a number."
    };
  }
  get validateAll() {
    return true;
  }
}

module.exports = Product;
