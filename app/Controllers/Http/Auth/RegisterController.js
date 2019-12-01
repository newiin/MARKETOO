"use strict";
const User = use("App/Models/User");
const Customer = use("App/Models/Customer");
class RegisterController {
  async create({ request, view, response }) {
    return view.render("auth.register");
  }
  async store({ request, auth, view, response }) {
    const { password, email } = request.all();
    try {
      const customer = await Customer.create();
      const customer_user = await customer.user().create({ email, password });
      const auth_user = await auth.login(customer_user);
      if (auth_user.userable_type === "customers") {
        response.route("customer.dashboard");
      } else if (auth_user.userable_type === "sellers") {
        response.route("seller.edit.profile");
      }
    } catch (error) {
      console.log({ error });

      return view.render("auth.register");
    }
  }
}

module.exports = RegisterController;
