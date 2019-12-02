"use strict";
const { sanitizor } = use("Validator");
const Category = use("App/Models/Category");
class CategoryController {
  async index({ request, view, response, auth }) {
    try {
      const categories = await Category.all();
      return view.render("admin.category.index", {
        categories: categories.toJSON()
      });
    } catch (error) {
      session.flash({
        notification: {
          type: "danger",
          message: error
        }
      });
      response.redirect("back");
    }
  }
  async create({ request, view, response, auth }) {
    const urlpath = request.url();
    return view.render("admin.category.create", { urlpath });
  }

  async store({ request, response, session }) {
    const { name, description } = request.all();
    const slug = await sanitizor.slug(name);
    try {
      await Category.create({ name, description, slug });
      session.flash({
        notification: {
          type: "success",
          message: `the category ${name} has been succesfully`
        }
      });
      response.redirect("back");
    } catch (error) {
      session.flash({
        notification: {
          type: "danger",
          message: error
        }
      });
      response.redirect("back");
    }
  }

  async edit({ params, request, response, view }) {
    return view.render("admin.category.edit");
  }

  async update({ params, request, response }) {}

  async destroy({ params, request, response }) {}
}

module.exports = CategoryController;
