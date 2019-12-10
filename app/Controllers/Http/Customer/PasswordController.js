"use strict";
const Hash = use("Hash");
class PasswordController {
  async edit({ view }) {
    return view.render("customer.password");
  }
  async update({ request, view, response, auth, session }) {
    const { password, old_password } = request.all();
    try {
      const user = await auth.getUser();
      const isSame = await Hash.verify(old_password, user.password);
      if (isSame) {
        user.password = password;
        user.save();
        session.flash({
          notification: {
            type: "success",
            message: `Your password has updated`
          }
        });
        return response.route("customer.dashboard");
      } else {
        session.flash({
          notification: {
            type: "danger",
            message: `Password dismatch`
          }
        });
        return response.redirect("back");
      }
    } catch (error) {
      session.flash({
        notification: {
          type: "negative",
          message: `We encoutered problem`
        }
      });
      return response.redirect("back");
    }
  }
}

module.exports = PasswordController;
