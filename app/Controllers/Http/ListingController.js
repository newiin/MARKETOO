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
        subcategories: subcategories.toJSON(),
        category: category.toJSON()
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
  async show({ request, view, response, params }) {
    const { slug } = params;
    try {
      const product = await Product.query()
        .where("slug", slug)
        .with("images")
        .with("seller")
        .fetch();
      const {
        seller: { first_name }
      } = product.toJSON()[0];
      const logo = first_name.toUpperCase().charAt(0);
      return view.render("products_listings.details", {
        product: product.toJSON()[0],
        logo
      });
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = ListingController;
