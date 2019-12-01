"use strict";
const Stripe = use("Stripe");
class PaymentController {
  async index({ request, view, response, auth }) {
    return view.render("payment.index");
  }
  async store({ request, view, response, auth }) {
    const { stripeToken } = request.all();
    console.log(stripeToken);

    console.log(request.all());

    // Stripe.customers
    //   .create({
    //     email: "carlosbarbier@example.com",
    //     source: stripeToken,
    //     description: "client"
    //   })
    //   .then(customer => {
    //     return Stripe.charges.create({
    //       amount: 25000000,
    //       description: "Sample Charge",
    //       currency: "eur",
    //       customer: customer.id
    //     });
    //   })
    //   .then(charge => {
    //     console.log(charge);
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   });
    // console.log(charge);

    return view.render("payment.index");
  }
}

module.exports = PaymentController;
