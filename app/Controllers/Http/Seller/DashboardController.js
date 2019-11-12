"use strict";
const Card = use("App/Models/Card");
const Seller = use("App/Models/Seller");
const User = use("App/Models/User");
const collect = require("collect.js");
class DashboardController {
  async index({ request, view, response, auth }) {
    var arr = ["apple", "banana", "canaple"];
    request.cart = arr.slice();

    return view.render("seller.dashboard");
  }
  async edit({ view }) {
    return view.render("seller.edit_profile");
  }

  async update({ request, response }) {
    const {
      shipping: { first_name, last_name },
      card: { number, type }
    } = request.except(["csrf_token", "_method"]);
    try {
      const user = await User.find(1);
      await user
        .cards()
        .create({ card_number: number, user_id: user.id, type });
      await user.profile().update({ first_name, last_name });
    } catch (error) {
      console.log(error);
    }

    response.redirect("back");
  }
}

module.exports = DashboardController;
