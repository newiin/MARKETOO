'use strict';
const { validate } = use('Validator');
class RegisterController {
  async index({ request, response, view }) {
    return view.render('seller.start');
  }

  async create({ request, response, session, view }) {}

  async store({ request, session, view, response }) {
    console.log(request.all());

    const rules = {
      email: 'required|email',
      name: 'required',
      password: 'required'
    };

    const validation = await validate(request.all(), rules);

    if (validation.fails()) {
      session.withErrors(validation.messages());
      return view.render('seller.start');
    }
  }

  async show({ params, request, response, view }) {}

  async edit({ params, request, response, view }) {}

  async update({ params, request, response }) {}

  async destroy({ params, request, response }) {}
}

module.exports = RegisterController;
