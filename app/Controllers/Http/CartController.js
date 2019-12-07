"use strict";
const ls = require("local-storage");
const Product = use("App/Models/Product");
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
      response.send({ number_of_items: cart.length });
    }
  }

  async removeItemFromCart({ response, params, session }) {
    const { id } = params;
    let cart = session.get("cart");
    cart = cart.filter(item => item.id != id);
    session.put("cart", cart);
    store.set("cart", cart);
    response.send({ number_of_items: cart.length });
  }
  async changeQuantityFromCart({ request, response, params, session }) {
    const { product } = request.get();
    let { id } = params;
    id = parseInt(id);
    let cart = session.get("cart");
    if (product === "add") {
      cart = cart.map(item => {
        if (item.id === id) {
          item = { ...item, qty: item.qty + 1 };
        }
        return item;
      });
    } else if (product === "reduce") {
      cart = cart.map(item => {
        if (item.id === id) {
          item = { ...item, qty: item.qty - 1 };
        }
        return item;
      });
    } else {
    }
    session.put("cart", cart);
    const total = cart.reduce((total, item) => {
      return total + item.qty * item.price;
    }, 0);
    store.set("total", total);
    const total_topay = store.get("total");
    session.put("total", total_topay);
    response.send({ cart, total });
  }
}

module.exports = CartController;
