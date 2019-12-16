"use strict";
const store = require("store");
const Product = use("App/Models/Product");
const Category = use("App/Models/Category");

class ListingController {
  async index({ request, view, response, session, params }) {
    const { slug } = params;
    const page = request.get().page || 1;
    try {
      const category = await Category.findBy("slug", slug);

      if (category) {
        const products = await category
          .products()
          .with("images")
          .with("subcategory.category")
          .paginate(page, 1);

        const subcategories = await category
          .subcategories()
          .withCount("products as total_products")
          .fetch();
        return view.render("products_listings.index", {
          subcategories: subcategories.toJSON(),
          category: category.toJSON(),
          products: products.toJSON()
        });
      } else {
        response.redirect("back");
      }
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
  async show({ request, view, response, params }) {
    const { slug } = params;
    try {
      const product = await Product.query()
        .where("slug", slug)
        .with("images")
        .with("seller")
        .first();
      if (product) {
        const seller_similar_products = await Product.query()
          .with("subcategory.category")
          .with("images")
          .with("seller", builder => {
            builder.where("id", 2);
          })
          .limit(4)
          .fetch();

        const {
          seller: { first_name }
        } = product.toJSON();
        const logo = first_name.toUpperCase().charAt(0);
        return view.render("products_listings.details", {
          product: product.toJSON(),
          logo,
          seller_similar_products: seller_similar_products.toJSON()
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  async filter({ request, response }) {
    if (request.ajax()) {
      let { slug, subcategory, price } = request.all();
      const category = await Category.findBy("slug", slug);
      if (typeof subcategory === "undefined") {
        subcategory = [];
      }
      if (category) {
        subcategory = subcategory.map(item => item * 1);
        try {
          const filters = await Product.query()
            .filter({ subcategory })
            .with("images")
            .with("subcategory.category")
            .fetch();
          response.status(200).send(filters);
        } catch (error) {
          console.log(error);
        }
      }
    } else {
      return;
    }
  }
}

module.exports = ListingController;
