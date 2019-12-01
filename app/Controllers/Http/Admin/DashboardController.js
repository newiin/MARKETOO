"use strict";

class DashboardController {
  async index({ request, view, response, auth }) {
    return view.render("admin.index");
  }
}

module.exports = DashboardController;
