"use strict";
const { validate } = use("Validator");
const User = use("App/Models/User");
const Seller = use("App/Models/Seller");
class RegisterController {
  async index({ request, response, view }) {
    return view.render("seller.start");
  }

  async store({ request, session, view, response, auth }) {
    const { email, password } = request.all();
    try {
      const seller = await Seller.create();
      const seller_user = await seller.user().create({ email, password });
      await auth.login(seller_user);
      response.route("seller.edit.profile");
    } catch (error) {
      console.log({ error });
    }
  }
}

module.exports = RegisterController;
