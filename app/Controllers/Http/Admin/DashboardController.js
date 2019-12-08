"use strict";
const Seller = use("App/Models/Seller");
const Customer = use("App/Models/Customer");
const Product = use("App/Models/Product");
class DashboardController {
  async index({ view }) {
    return view.render("admin.index");
  }
  async sellers({ view, response, session }) {
    try {
      const sellers = await Seller.query()
        .with("user")
        .fetch();
      return view.render("admin.sellers", { sellers: sellers.toJSON() });
    } catch (error) {
      session.flash({
        notification: {
          type: "danger",
          message: error.message
        }
      });
      response.redirect("back");
    }
  }
  async customers({ view, response, session }) {
    try {
      const customers = await Customer.query()
        .with("user")
        .fetch();
      return view.render("admin.customers", { customers: customers.toJSON() });
    } catch (error) {
      session.flash({
        notification: {
          type: "danger",
          message: error.message
        }
      });
      response.redirect("back");
    }
  }

  async products({ view, response, session }) {
    try {
      const products = await Product.query()
        .with("subcategory.category")
        .with("seller")
        .fetch();
      return view.render("admin.products", { products: products.toJSON() });
    } catch (error) {
      session.flash({
        notification: {
          type: "danger",
          message: error.message
        }
      });
      response.redirect("back");
    }
  }
}

module.exports = DashboardController;
