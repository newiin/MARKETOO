"use strict";
const Product = use("App/Models/Product");
class HomeController {
  async index({ request, view, response, session }) {
    try {
      const newest_products = await Product.query()
        .with("subcategory.category")
        .with("images")
        .orderBy("created_at", "desc")
        .limit(4)
        .fetch();

      const featured_products = await Product.query()
        .where("is_featured", true)
        .with("subcategory.category")
        .with("images")
        .limit(4)
        .fetch();
      return view.render("main.home", {
        featured_products: featured_products.toJSON(),
        newest_products: newest_products.toJSON()
      });
    } catch (error) {}
  }
}

module.exports = HomeController;
