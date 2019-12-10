"use strict";
const Card = use("App/Models/Card");
const Seller = use("App/Models/Seller");
const User = use("App/Models/User");
class DashboardController {
  async index({ view, auth, session }) {
    return view.render("seller.dashboard");
  }
  async edit({ view }) {
    return view.render("seller.edit_profile");
  }

  async update({ request, response, auth, session }) {
    const {
      first_name,
      last_name,
      company_name,
      phone,
      company_description,
      _address,
      _state,
      _city,
      _country
    } = request.all();
    const user = await auth.getUser();
    await user.profile().update({
      first_name,
      last_name,
      company_name,
      phone,
      company_description,
      address: _address,
      state: _state,
      city: _city,
      country: _country
    });
    session.flash({
      notification: {
        type: "success",
        message: `Your Profile has been updated`
      }
    });
    response.route("seller.dashboard");
    try {
    } catch (error) {
      console.log(error);

      session.flash({
        notification: {
          type: "negative",
          message: `Something went wrong`
        }
      });
      response.redirect("back");
    }
  }
}

module.exports = DashboardController;
