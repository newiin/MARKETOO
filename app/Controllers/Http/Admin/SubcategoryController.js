"use strict";
const { sanitizor } = use("Validator");
const Subcategory = use("App/Models/Subcategory");
const Category = use("App/Models/Category");
class SubcategoryController {
  async index({ view, response, session }) {
    try {
      const subcategories = await Subcategory.all();
      return view.render("admin.subcategory.index");
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
  async create({ request, view }) {
    const categories = await Category.all();
    const urlpath = request.url();
    return view.render("admin.subcategory.create", {
      urlpath,
      categories: categories.toJSON()
    });
  }

  async store({ request, response, session }) {
    const { name, category } = request.all();
    const slug = await sanitizor.slug(name);
    try {
      await Subcategory.create({ name, slug, category_id: category });
      session.flash({
        notification: {
          type: "success",
          message: `the subcategory ${name} has been succesfully`
        }
      });
      response.redirect("back");
    } catch (error) {
      console.log(error);

      session.flash({
        notification: {
          type: "danger",
          message: "Sorry something went wrong"
        }
      });
      response.redirect("back");
    }
  }

  async edit({ params, request, response, view }) {
    return view.render("admin.sucategory.edit");
  }

  async update({ params, request, response }) {}

  async destroy({ params, request, response }) {}
}

module.exports = SubcategoryController;
