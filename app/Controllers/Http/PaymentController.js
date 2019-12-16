"use strict";
const Stripe = use("Stripe");
const Order = use("App/Models/Order");
class PaymentController {
  async index({ view, session }) {
    if (session.get("cart")) {
      const total = session.get("total");

      return view.render("payment.index", { total });
    }
  }
  async store({ request, view, response, session, auth }) {
    const { stripeToken } = request.all();

    const customer = await auth.user.profile().fetch();

    const total = session.get("total");
    const cart = session.get("cart");
    const email = await auth.user.email;
    Stripe.customers
      .create({
        email,
        source: stripeToken,
        description: "customer"
      })
      .then(customer => {
        return Stripe.charges.create({
          amount: total * 100,
          description: "Iot-eshop Bill",
          currency: "eur",
          customer: customer.id
        });
      })
      .then(charge => {})
      .then(() => {
        Order.create({
          customer_id: customer.id,
          seller_id: cart.seller_id,
          total: total
        }).then(order => {
          order.transactions().createMany(cart);
        });
      })
      .catch(err => {
        console.log(err);
      });
    session.forget("cart");
    if (customer.is_updated === 1) {
      response.route("customer.address.edit");
    } else {
      response.redirect("/");
    }
  }
}

module.exports = PaymentController;
