"use strict";
const Stripe = use("Stripe");
const Order = use("App/Models/Order");
const Transaction = use("App/Models/Transaction");
class PaymentController {
  async index({ view, session, auth }) {
    return view.render("payment.index");
  }
  async store({ request, view, response, session, auth }) {
    const { stripeToken } = request.all();
    const user = await auth.user;
    const total = session.get("total");
    const cart = session.get("cart");

    Stripe.customers
      .create({
        email: user.email,
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
          customer_id: user.id,
          seller_id: cart.seller_id,
          total: total
        })
          .then(order => {
            order.transactions().createMany(cart);
          })
          .then(() => {
            session.forget("cart");
          });
      })

      .catch(err => {
        console.log(err);
      });
    response.redirect("/");
  }
}

module.exports = PaymentController;
