"use strict";

class LoginController {
  async create({ request, view, response }) {
    return view.render("auth.login");
  }
  async store({ request, view, response }) {
    return view.render("auth.login");
  }
}

module.exports = LoginController;
