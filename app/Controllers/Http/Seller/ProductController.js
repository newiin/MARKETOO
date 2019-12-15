"use strict";
const collect = require("collect.js");
const Product = use("App/Models/Product");
const Image = use("App/Models/Image");
const Helpers = use("Helpers");
const Drive = use("Drive");
const { sanitizor } = use("Validator");
const Subcategory = use("App/Models/Subcategory");
const moment = require("moment");
class ProductController {
  async index({ auth, response, view }) {
    try {
      const user = await auth.user.profile().fetch();
      const products = await user.products().fetch();
      const total = await user.products().getCount();
      return view.render("seller.products.index", {
        products: products.toJSON(),
        moment,
        total
      });
    } catch (error) {
      console.log(error);
    }
  }

  async create({ request, response, view }) {
    const urlpath = request.url();
    const subcategories = await Subcategory.all();
    return view.render("seller.products.create", {
      urlpath,
      subcategories: subcategories.toJSON()
    });
  }

  async store({ request, response, session, auth }) {
    try {
      const seller = await auth.user.profile().first();
      console.log(seller);

      const {
        title,
        description,
        subcategory,
        quantity,
        price
      } = request.all();
      const slug = await sanitizor.slug(title);
      const product = await seller.products().create({
        title,
        slug,
        description,
        subcategory_id: subcategory,
        quantity,
        price
      });

      session.flash({
        notification: {
          type: "success",
          message: `Your product has been success full created add images`
        }
      });
      response.route("seller.product.image.create", { id: product.id });
    } catch (error) {
      console.log(error);
    }
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
    const { id } = params;
    if (request.ajax()) {
      try {
        request.multipart.file("file", {}, async file => {
          const url = await Drive.disk("s3").put(
            new Date().getTime() + "_" + file.clientName,
            file.stream
          );
          const product = await Product.findOrFail(id);
          await product.images().createMany([{ url }]);
        });

        await request.multipart.process();
      } catch (error) {
        console.log(error);
      }
    }
    session.flash({
      notification: {
        type: "success",
        message: `Your Profile has been created`
      }
    });
    response.route("seller.dashboard");
  }
}

module.exports = ProductController;
