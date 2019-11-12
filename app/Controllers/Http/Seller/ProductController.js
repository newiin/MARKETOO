"use strict";
const collect = require("collect.js");
const Product = use("App/Models/Product");
const Helpers = use("Helpers");
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
      const images = request.file("file");
      await images.move(Helpers.publicPath("products"), {
        name: `${new Date().getTime()}.${images.subtype}`
      });
      if (!image.moved()) {
        session
          .withErrors([
            { field: "image", message: "We could not upload try again" }
          ])
          .flashAll();
        response.redirect("back");
      }
    }
    session.flash({
      notification: {
        type: "success",
        message: `Your Profile has been created`
      }
    });
    // try {
    //   await Profile.create({ user_id, about, education, city, area, is_roaming: roaming, phone, available, image: image.fileName })
    //   session.flash({
    //     notification: {
    //       type: 'success',
    //       message: `Your Profile has been created`
    //     }
    //   })session.flash({
    //     notification: {
    //       type: 'success',
    //       message: `Your Profile has been created`
    //     }
    //   })
    //   response.route('teacher.dashboard.index')
    // } catch (error) {
    //   console.log(error);

    //   session.flash({
    //     notification: {
    //       type: 'negative',
    //       message: `We could not create your profile try later`
    //     }
    //   })

    response.redirect("back");
  }
}

module.exports = ProductController;
