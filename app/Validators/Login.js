"use strict";

class Login {
  get rules() {
    return {
      email: "required|email",
      password: "required"
    };
  }

  get messages() {
    return {
      "email.required": "You must provide a email address.",
      "email.email": "You must provide a valid email address.",
      "password.required": "You must provide a password"
    };
  }
  get validateAll() {
    return true;
  }
}

module.exports = Login;
