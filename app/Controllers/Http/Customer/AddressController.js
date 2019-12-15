"use strict";
const Customer = use("App/Models/Customer");
class AddressController {
  async create({ view }) {
    return view.render("customer.address");
  }

  async store({ session, request, response, auth }) {
    try {
      const {
        address,
        name,
        phone,
        city,
        state,
        area,
        country,
        _address,
        _city,
        _state,
        _area,
        _country
      } = request.all();

      await auth.user.profile().update({
        address,
        name,
        phone,
        city,
        state,
        country,
        billing_address: _address,
        billing_city: city,
        billing_state: _state,
        billing_country: _country
      });
      session.flash({
        notification: {
          type: "success",
          message: `Your Profile has been updated`
        }
      });
      response.route("customer.dashboard");
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = AddressController;
