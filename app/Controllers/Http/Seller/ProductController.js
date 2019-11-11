"use strict";

class ProductController {
  async index({ request, response, view }) {
    return view.render("seller.products.index");
  }

  async create({ request, response, view }) {
    return view.render("seller.products.create");
  }

  async store({ request, response }) {}

  async show({ params, request, response, view }) {}

  async edit({ params, request, response, view }) {}

  async update({ params, request, response }) {}

  async destroy({ params, request, response }) {}

  async image({ params, request, view, response }) {
    return view.render("seller.products._add_image");
  }

  async imageStore({ params, request, response }) {
    const image = request.file("file");
    console.log(" start++++++++++++");
    console.log(image);
    console.log("end ++++++++++++");

    response.redirect("back");
  }
}

module.exports = ProductController;
