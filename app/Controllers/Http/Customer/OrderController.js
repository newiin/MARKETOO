"use strict";

class OrderController {
  async index({ request, view, response, auth }) {
    const customer = await auth.user.profile().first();
    console.log(customer);

    const orders = await customer
      .orders()
      .with("transactions.seller")
      .fetch();

    response.send(orders);
  }
}

module.exports = OrderController;
