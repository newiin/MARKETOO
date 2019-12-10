"use strict";

class SellerInfo {
  get rules() {
    return {
      first_name: "required",
      last_name: "required",
      company_name: "required",
      phone: "required",
      company_description: "required",
      _address: "required",
      _city: "required",
      _state: "required",
      _area: "required",
      _country: "required"
    };
  }

  get messages() {
    return {
      "_address.required": " Address required ",
      "_state.required": "State required ",
      "_city.required": " City required ",
      "_area.required": "Area required ",
      "_country.required": " Billing country required ",
      "first_name.required": " Name required ",
      "last_name.required": " Name required ",
      "phone.required": " Phone Number required ",
      "company_name.required": " Company name required ",
      "company_decription.required": " Company description required "
    };
  }
  get validateAll() {
    return true;
  }
}

module.exports = SellerInfo;
