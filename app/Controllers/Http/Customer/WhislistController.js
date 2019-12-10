"use strict";
const Product = use("App/Models/Product");
const store = require("store");
class WhislistController {
  async index({ view, request, session }) {
    const items = session.get("whish");
    return view.render("whish", { items });
  }
  async add({ request, session, response, params }) {
    if (request.ajax()) {
      let { id } = params;
      let whish;
      const pro = await Product.query()
        .where("id", id)
        .with("images")
        .first();
      const product = pro.toJSON();
      if (session.get("whish")) {
        whish = session.get("whish");
        store.set("whish", whish);
        let newItem = true;
        for (let i = 0; i < whish.length; i++) {
          if (whish[i].product_id == id) {
            newItem = false;
            break;
          }
        }
        if (newItem) {
          whish.push({
            product_id: product.id,
            title: product.title,
            price: parseFloat(product.price).toFixed(2),
            image: product.images[0].url
          });
        }
      } else {
        session.put("whish", []);
        whish = session.get("whish");
        whish.push({
          product_id: product.id,
          title: product.title,
          price: parseFloat(product.price).toFixed(2),
          image: product.images[0].url
        });
        session.put("wish", whish);
        store.set("whish", whish);
      }

      response.send(whish.length);
    }
  }
  async removeItemFromWhishList({ response, session, params }) {
    const { id } = params;
    let whish = session.get("whish");
    whish = whish.filter(item => item.product_id != id);
    session.put("whish", whish);
    store.set("whish", whish);
    response.send({ total: whish.length });
  }
}

module.exports = WhislistController;
