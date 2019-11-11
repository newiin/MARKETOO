"use strict";

/** @type {import('@adonisjs/framework/src/Hash')} */
const Hash = use("Hash");

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class User extends Model {
  static boot() {
    super.boot();

    this.addHook("beforeSave", async userInstance => {
      if (userInstance.dirty.password) {
        userInstance.password = await Hash.make(userInstance.password);
      }
    });
  }

  tokens() {
    return this.hasMany("App/Models/Token");
  }
  static get traits() {
    return ["@provider:Morphable"];
  }

  profile() {
    return this.morphTo(
      ["App/Models/Seller", "App/Models/Customer"],
      "id",
      "id",
      "userable_id",
      "userable_type"
    );
  }
  cards() {
    return this.hasMany("App/Models/Card");
  }
}

module.exports = User;
