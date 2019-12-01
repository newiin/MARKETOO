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
    const seller = await Seller.create();
    try {
      const seller = await Seller.create();
      const user = await User.findBy("email", email);
      const seller_user = await seller.user().create({ email, password });
      response.route("seller.edit.profile");
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
