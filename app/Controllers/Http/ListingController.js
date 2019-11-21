"use strict";
const store = require("store");
const Product = use("App/Models/Product");

class ListingController {
  async index({ request, view, response, session }) {
    try {
      const products = await Product.all();
      session.forget("cart");
      return view.render("products_listings.index", {
        products: products.toJSON()
      });
    } catch (error) {
      console.log(error);
    }
  }
  async add({ request, view, response, auth, params }) {
    if (request.ajax()) {
      const { id } = params;
      const product = await Product.findOrFail(id);
      response.send(product);
    }
  }
}

module.exports = ListingController;
