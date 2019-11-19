"use strict";
const ls = require("local-storage");
const Product = use("App/Models/Product");
const Cart = use("App/Cart");
const storage = require("node-persist");
class CartController {
  async addItemToCart({ request, response, params, session }) {
    if (request.ajax()) {
      let { id } = params;
      let cart;
      const product = await Product.findOrFail(id);
      await storage.init({
        stringify: JSON.stringify,
        parse: JSON.parse,
        encoding: "utf8",
        logging: false,
        ttl: false,
        expiredInterval: 2 * 60 * 1000,
        forgiveParseErrors: false
      });
      const items = await storage.getItem("cart");
      try {
        if (items) {
          cart = items;
          let newItem = true;
          for (let i = 0; i < cart.length; i++) {
            if (cart[i].id == id) {
              cart[i].qty++;
              newItem = false;
              break;
            }
          }
          if (newItem) {
            cart.push({
              id: product.id,
              title: product.title,
              qty: 1,
              price: parseFloat(product.price).toFixed(2)
            });
          }
        } else {
          await storage.setItem("cart", []);
          cart = await storage.getItem("cart");
          cart.push({
            id: product.id,
            title: product.title,
            qty: 1,
            price: parseFloat(product.price).toFixed(2)
          });
        }
      } catch (error) {
        console.log(error);
      }
      response.send({ total: cart.length, cart });
    }
  }
}

module.exports = CartController;
