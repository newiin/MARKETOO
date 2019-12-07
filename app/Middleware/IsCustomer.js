"use strict";

class IsCustomer {
  async handle({ request, response, session, auth, view }, next) {
    let userable_type = "customers";

    try {
      userable_type = await auth.user.userable_type;
    } catch (error) {
      session.flash({
        notification: {
          type: "negative",
          message: `You try to gey access to a forbitten area`
        }
      });
      response.redirect("/");
    }
    if (userable_type == "sellers") {
      session.flash({
        notification: {
          type: "negative",
          message: `You try to gey access to a forbitten area`
        }
      });
      response.route("seller.dashboard");
    } else if (userable_type == "admins") {
      session.flash({
        notification: {
          type: "negative",
          message: `You try to gey access to a forbitten area`
        }
      });
      response.route("admin.dashboard");
    }
    await next();
  }
}

module.exports = IsCustomer;
