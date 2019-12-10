"use strict";
const ls = require("local-storage");
const Helpers = use("Helpers");
const store = require("store");
class CheckoutController {
  async checkout({ request, response, session, auth }) {
    try {
      const user = await auth.getUser();
      if (user && user.userable_type === "customers") {
        response.route("payment.create");
      }
    } catch (error) {
      session.put("checkout", true);
      const checkout = session.get("checkout");
      store.set("checkout", true);
      response.route("login.create");
    }
  }
}

module.exports = CheckoutController;
