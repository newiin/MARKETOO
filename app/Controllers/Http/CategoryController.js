"use strict";
const Category = use("App/Models/Category");
const Seller = use("App/Models/Seller");
const Customer = use("App/Models/Customer");
const User = use("App/Models/User");
class CategoryController {
  async index({ response, request, params, session }) {
    const { slug } = params;
    try {
      const category = await Category.findBy("slug", slug);

      response.send({ category });
    } catch (error) {
      response.send({ error });
    }
  }

  async test({ response, request, params }) {
    response.status(200).send("ok");
    // try {
    //   const user = await User.findBy('id', 1);
    //   const seller = await user.profile().fetch();
    //   response.send({ seller });
    // } catch (error) {
    //   console.log(error);
    // }
  }
}

module.exports = CategoryController;
