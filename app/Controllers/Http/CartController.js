"use strict";
const ls = require("local-storage");
const Product = use("App/Models/Product");
const store = require("store");

class CartController {
  async addItemToCart({ request, response, session, params }) {
    if (request.ajax()) {
      let { id } = params;
      let cart;
      const pro = await Product.query()
        .where("id", id)
        .with("images")
        .first();
      const product = pro.toJSON();
      if (session.get("cart")) {
        cart = session.get("cart");
        store.set("cart", cart);
        let newItem = true;
        for (let i = 0; i < cart.length; i++) {
          if (cart[i].product_id == id) {
            cart[i].qty++;
            newItem = false;
            break;
          }
        }
        if (newItem) {
          cart.push({
            product_id: product.id,
            title: product.title,
            qty: 1,
            price: parseFloat(product.price).toFixed(2),
            image: product.images[0].url,
            seller_id: product.seller_id
          });
        }
      } else {
        session.put("cart", []);
        cart = session.get("cart");
        cart.push({
          product_id: product.id,
          title: product.title,
          qty: 1,
          price: parseFloat(product.price).toFixed(2),
          image: product.images[0].url,
          seller_id: product.seller_id
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
    cart = cart.filter(item => item.product_id != id);
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
        if (item.product_id === id) {
          item = { ...item, qty: item.qty + 1 };
        }
        return item;
      });
    } else if (product === "reduce") {
      cart = cart.map(item => {
        if (item.product_id === id) {
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
  async myShoppingCart({ session, view, response, auth }) {
    if (session.get("cart")) {
      const items = session.get("cart");
      const total = items.reduce((total, item) => {
        return total + item.qty * item.price;
      }, 0);
      store.set("total", total);
      const total_topay = store.get("total");
      session.put("total", total_topay);

      return view.render("products_in_cart", { items, total });
    }

    return view.render("products_in_cart");
  }
}

module.exports = CartController;
