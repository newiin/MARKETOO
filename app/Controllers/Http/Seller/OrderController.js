"use strict";

class OrderController {
  async index({ request, view, response, auth }) {
    try {
      const seller = await auth.user.profile().fetch();

      const orders = await seller
        .transactions()
        .with("order.customer")

        .fetch();
      response.status(200).send(orders);

      return view.render("seller.orders", { orders: orders.toJSON() });
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = OrderController;
