"use strict";
const User = use("App/Models/User");
class LoginController {
  async create({ request, view, response }) {
    return view.render("auth.login");
  }

  async store({ request, session, view, auth, response }) {
    const { email, password } = request.all();
    try {
      const user = await auth.attempt(email, password);
      if (user.userable_type === "customers") {
        const get_user = await User.findBy("email", user.email);
        const user_found = await get_user.profile().fetch();
        if (user_found.is_updated_profile === 1) {
          response.route("payment.create");
        } else {
          response.route("customer.dashboard");
        }
      } else if (user.userable_type === "sellers") {
        response.route("seller.dashboard");
      } else if (user.userable_type === "admins") {
        response.route("admin.dashboard");
      }
    } catch (error) {
      if (error.name === "UserNotFoundException") {
        session.withErrors({ email: error.message }).flashAll();
        response.redirect("back");
      }
      if (error.name === "PasswordMisMatchException") {
        session.withErrors({ password: error.message }).flashAll();
        response.redirect("back");
      }
    }
  }
}

module.exports = LoginController;
