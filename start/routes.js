"use strict";

const Route = use("Route");

Route.get("/", "HomeController.index").as("main.home");
Route.get("/category/:slug", "ListingController.index").as("listings.product");
Route.get("/product/:slug", "ListingController.show").as("listings.show");

// user Auth
Route.get("/auth/register", "Auth/RegisterController.create").as(
  "register.create"
);
Route.post("/auth/register", "Auth/RegisterController.store")
  .as("register.store")
  .validator(["Register"]);
Route.get("/auth/login", "Auth/LoginController.create").as("login.create");
Route.post("/auth/login", "Auth/LoginController.store")
  .as("login.store")
  .validator(["Login"]);
Route.get("/auth/logout", "Auth/LogoutController.logout").as("auth.logout");
// Seller   registration
Route.get("/seller/start", "Seller/RegisterController.index");
Route.get("/seller/register", "Seller/RegisterController.create");
Route.post("/seller/register", "Seller/RegisterController.store").validator([
  "RegisterSeller"
]);

// Shopping cart
Route.get("/shopping/checkout", "CheckoutController.index").as("checkout");
Route.get("/shopping/charge", "PaymentController.index").as("payment.create");
Route.post("shopping/charge", "PaymentController.store").as("payment.store");
Route.get("/cart/add/:id", "CartController.addItemToCart");
Route.get("/cart/remove/:id", "CartController.removeItemFromCart");
Route.get("/cart/change/:id", "CartController.changeQuantityFromCart");

// Seller dashboard
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
  Route.post("/product/create", "Seller/ProductController.store")
    .as("seller.product.store")
    .validator(["Product"]);
  Route.get("/product/create/image/:id", "Seller/ProductController.image").as(
    "seller.product.image.create"
  );
  Route.post(
    "/product/create/image/:id",
    "Seller/ProductController.imageStore"
  ).as("seller.product.image.store");
})
  .prefix("/seller/dashboard")
  .middleware(["seller"]);

//Admin
Route.group(() => {
  Route.get("/", "Admin/DashboardController.index").as("admin.dashboard");
  Route.get("/category", "Admin/CategoryController.index").as("admin.category");
  Route.get("/category/create", "Admin/CategoryController.create").as(
    "admin.category.create"
  );
  // category
  Route.post("/category/create", "Admin/CategoryController.store")
    .as("admin.category.store")
    .validator(["Category"]);
  Route.get("/category/:slug/edit", "Admin/CategoryController.edit").as(
    "admin.category.edit"
  );
  Route.put("/category/:slug/edit", "Admin/CategoryController.update").as(
    "admin.category.put"
  );
  // subcategory
  Route.get("/subcategory", "Admin/SubcategoryController.index").as(
    "admin.subcategory"
  );
  Route.get("/subcategory/create", "Admin/SubcategoryController.create").as(
    "admin.subcategory.create"
  );
  Route.post("/subcategory/create", "Admin/SubcategoryController.store")
    .as("admin.subcategory.store")
    .validator(["Subcategory"]);
  Route.get("/subcategory/:slug/edit", "Admin/SubcategoryController.edit").as(
    "admin.subcategory.edit"
  );
  Route.put("/subcategory/:slug/edit", "Admin/SubcategoryController.update").as(
    "admin.subcategory.put"
  );
  Route.get("/sellers", "Admin/DashboardController.sellers").as(
    "admin.sellers"
  );
  Route.get("/customers", "Admin/DashboardController.customers").as(
    "admin.customers"
  );
}).prefix("/admin/dashboard");
// Customer
Route.group(() => {
  Route.get("/", "Customer/DashboardController.index").as("customer.dashboard");
})
  .prefix("/customer/dashboard")
  .middleware(["customer"]);
