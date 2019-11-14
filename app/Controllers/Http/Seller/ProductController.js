"use strict";
const collect = require("collect.js");
const Product = use("App/Models/Product");
const Image = use("App/Models/Image");
const Helpers = use("Helpers");
const Drive = use("Drive");
class ProductController {
  async index({ request, response, view }) {
    return view.render("seller.products.index");
  }

  async create({ request, response, view }) {
    const urlpath = request.url();
    return view.render("seller.products.create", { urlpath });
  }

  async store({ request, response }) {
    const { title, description } = request.all();
    const product = await Product.create({ title, description });

    response.route("seller.product.image.create", { id: product.id });
  }

  async show({ params, request, response, view }) {}

  async edit({ params, request, response, view }) {}

  async update({ params, request, response }) {}

  async destroy({ params, request, response }) {}

  async image({ params, request, view, response }) {
    const { id } = params;
    const urlpath = request.url();
    return view.render("seller.products._add_image", { id, urlpath });
  }

  async imageStore({ params, request, response, session }) {
    if (request.ajax()) {
      request.multipart.file("file", {}, async file => {
        const url = await Drive.disk("s3").put(
          new Date().getTime() + "_" + file.clientName,
          file.stream
        );
        try {
          const product = await Product.findOrFail(9);
          await product.images().createMany([{ product_id: product.id, url }]);
        } catch (error) {
          console.log(error);
        }
      });

      await request.multipart.process();
    }
    session.flash({
      notification: {
        type: "success",
        message: `Your Profile has been created`
      }
    });
    response.redirect("back");
  }
}

module.exports = ProductController;
