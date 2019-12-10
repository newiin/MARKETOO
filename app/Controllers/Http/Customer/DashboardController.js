"use strict";
const moment = require("moment");
class DashboardController {
  async index({ request, view, response, auth }) {
    return view.render("customer.dashboard");
  }
  async orders({ request, view, response, auth }) {
    try {
      const user = await auth.getUser();
      const customer = await user.profile().fetch();
      const orders = await customer.orders().fetch();
      return view.render("customer.orders", {
        orders: orders.toJSON(),
        moment
      });
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = DashboardController;
