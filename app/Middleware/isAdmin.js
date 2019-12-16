"use strict";
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

class IsSeller {
  async handle({ request, response, auth, session }, next) {
    let userable_type = "admins";
    try {
      userable_type = await auth.user.userable_type;
    } catch (error) {
      auth.logout();
      response.route("login.create");
    }
    if (userable_type == "customers") {
      session.flash({
        notification: {
          type: "negative",
          message: `You try to gey access to a forbitten area`
        }
      });
      response.route("customer.dashboard");
    } else if (userable_type == "sellers") {
      session.flash({
        notification: {
          type: "negative",
          message: `You try to gey access to a forbitten area`
        }
      });
      response.route("seller.dashboard");
    }
    await next();
  }
}

module.exports = IsSeller;
