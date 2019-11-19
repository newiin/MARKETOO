"use strict";
class HomeController {
  async index({ request, view, response, session }) {
    return view.render("main.home");
  }
}

module.exports = HomeController;
