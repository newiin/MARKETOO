"use strict";

class RegisterSeller {
  get rules() {
    return {
      email: "required|unique:users",
      password: "required"
    };
  }

  get messages() {
    return {
      "email.required": "email required",
      "email.email": "Enter a valide email",
      "password.required": "Password Required"
    };
  }
  get validateAll() {
    return true;
  }
}

module.exports = RegisterSeller;
