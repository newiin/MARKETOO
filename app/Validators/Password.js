"use strict";

class Password {
  get rules() {
    return {
      password: "required|min:5|max:30|confirmed",
      old_password: "required"
    };
  }

  get messages() {
    return {
      "password.required": "You must provide a password",
      "password.confirmed": "Confirm Your password",
      "old_password.confirmed": "Please enter your current password"
    };
  }
  get validateAll() {
    return true;
  }
}

module.exports = Password;
