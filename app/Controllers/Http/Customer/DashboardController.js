"use strict";

class DashboardController {
  async index({ request, view, response, auth }) {
    return view.render("customer.dashboard");
  }
}

module.exports = DashboardController;
