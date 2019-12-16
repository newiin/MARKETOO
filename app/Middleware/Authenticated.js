"use strict";

class Authenticated {
  async handle({ auth, response }, next) {
    try {
      await auth.check();
    } catch (error) {
      auth.logout();
      response.route("login.create");
    }
    await next();
  }
}

module.exports = Authenticated;
