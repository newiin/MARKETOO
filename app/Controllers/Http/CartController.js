"use strict";
const ls = require("local-storage");
const Product = use("App/Models/Product");
const Cart = use("App/Cart");
const store = require("store");

class CartController {
  async addItemToCart({ request, response, session, params }) {
    if (request.ajax()) {
      let { id } = params;
      let cart;
      const product = await Product.findOrFail(id);
      if (session.get("cart")) {
        cart = session.get("cart");
        store.set("cart", cart);
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
        session.put("cart", []);
        cart = session.get("cart");
        cart.push({
          id: product.id,
          title: product.title,
          qty: 1,
          price: parseFloat(product.price).toFixed(2)
        });
        store.set("cart", cart);
        store.set("cart", cart);
      }

      response.send({ total: cart.length, cart });
    }
  }

  async removeItemFromCart({ response, params, session }) {
    const { id } = params;
    let cart = session.get("cart");
    cart = cart.filter(item => item.id != id);
    session.put("cart", cart);
    store.set("cart", cart);
    response.send({ cart });
  }
  async changeQuantityFromCart({ request, response, params, session }) {
    const { product } = request.get();
    const { id } = params;
    let cart = store.get("cart");

    response.send({ cart });
  }
}

module.exports = CartController;
