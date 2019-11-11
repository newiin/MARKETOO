"use strict";
const { validate } = use("Validator");
const User = use("App/Models/User");
const Seller = use("App/Models/Seller");
class RegisterController {
  async index({ request, response, view }) {
    return view.render("seller.start");
  }

  async store({ request, session, view, response }) {
    const { email, password } = request.all();

    try {
      const seller = await Seller.create();
      const user = await User.findBy("email", email);
      const seller_user = await seller
        .user()
        .create({ email, password, role: "seller" });
      response.route("seller.dashboard");
    } catch (error) {
      console.log({ error });
    }
  }

  async show({ params, request, response, view }) {}

  async edit({ params, request, response, view }) {}

  async update({ params, request, response }) {}

  async destroy({ params, request, response }) {}
}

module.exports = RegisterController;
