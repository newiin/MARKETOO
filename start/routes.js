"use strict";

const Route = use("Route");

Route.on("/").render("main.home");
Route.get("/:slug", "CategoryController.index").as("category.index");
Route.get("/test/test", "CategoryController.test");
Route.get("/seller/start", "Seller/RegisterController.index");
Route.get("/seller/register", "Seller/RegisterController.create");
Route.post("/seller/register", "Seller/RegisterController.store").validator([
  "RegisterSeller"
]);

Route.group(() => {
  Route.get("/", "Seller/DashboardController.index").as("seller.dashboard");
  Route.get("/profile/edit", "Seller/DashboardController.edit").as(
    "seller.edit.profile"
  );
  Route.put("/profile/edit", "Seller/DashboardController.update").as(
    "seller.edit.update"
  );
  Route.get("/product/", "Seller/ProductController.index").as(
    "seller.product.index"
  );
  Route.get("/product/create", "Seller/ProductController.create").as(
    "seller.product.create"
  );
  Route.post("/product/create", "Seller/ProductController.store").as(
    "seller.product.store"
  );
  Route.get("/product/create/image", "Seller/ProductController.image").as(
    "seller.product.image.create"
  );
  Route.post("/product/create/image", "Seller/ProductController.imageStore").as(
    "seller.product.image.store"
  );
}).prefix("/user/dashboard");
