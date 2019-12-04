"use strict";
const store = require("store");
const Product = use("App/Models/Product");
const Category = use("App/Models/Category");

class ListingController {
  async index({ request, view, response, session, params }) {
    const { slug } = params;
    try {
      const category = await Category.findBy("slug", slug);
      const products = await category
        .products()
        .with("images")
        .with("subcategory.category")
        .fetch();

      const subcategories = await category
        .subcategories()
        .withCount("products as total_products")
        .fetch();
      return view.render("products_listings.index", {
        products: products.toJSON(),
        subcategories: subcategories.toJSON()
      });
    } catch (error) {}
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
