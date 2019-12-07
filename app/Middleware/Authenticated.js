"use strict";

class Authenticated {
  async handle({ auth, response }, next) {
    try {
      await auth.check();
    } catch (error) {
      response.route("main.home");
    }
    await next();
  }
}

module.exports = Authenticated;
