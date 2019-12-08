"use strict";

class Address {
  get rules() {
    return {
      address: "required",
      name: "required",
      phone: "required",
      city: "required",
      state: "required",
      area: "required",
      country: "required",
      _address: "required",
      _city: "required",
      _state: "required",
      _area: "required",
      _country: "required"
    };
  }

  get messages() {
    return {
      "address.required": "Shipping address required ",
      "state.required": "Shipping state required ",
      "city.required": " Shipping city required ",
      "area.required": "Shipping Zip code required ",
      "country.required": " Shipping country required ",
      "_address.required": "Billing address required ",
      "_state.required": "Billing state required ",
      "_city.required": " Billing city required ",
      "_area.required": "Billing area required ",
      "name.required": " Name required ",
      "phone.required": " Phone Number required ",
      "_country.required": " Billing country required "
    };
  }
  get validateAll() {
    return true;
  }
}

module.exports = Address;
