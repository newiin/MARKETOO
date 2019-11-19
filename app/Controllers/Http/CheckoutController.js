"use strict";
const ls = require("local-storage");
const Helpers = use("Helpers");
const store = require("store");
class CheckoutController {
  async index({ request, view, response, session }) {
    if (session.get("cart")) {
      const items = session.get("cart");
      return view.render("checkout", { total: items.length });
    }

    return view.render("checkout");
  }
}

module.exports = CheckoutController;
