"use strict";

const Route = use("Route");

Route.get("/", "HomeController.index").as("main.home");
// Route.get("/category/:slug", "ListingController.index").as("listings.product");
Route.route("/products/filter", "ListingController.filter", ["GET", "POST"]).as(
  "listings.product.filter"
);
Route.get("/product/:slug", "ListingController.show").as("listings.show");
Route.route("/category/:slug", "ListingController.index", ["GET", "POST"]).as(
  "listings.product"
);

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
Route.post("/shopping/checkout", "CheckoutController.checkout").as("checkout");
Route.get("/cart/add/:id", "CartController.addItemToCart");
Route.get("/cart/remove/:id", "CartController.removeItemFromCart");
Route.get("/cart/change/:id", "CartController.changeQuantityFromCart");
Route.get("/my/cart", "CartController.myShoppingCart").as("my.cart");
Route.get("/cart/charge", "PaymentController.index")
  .as("payment.create")
  .middleware(["customer"]);
Route.post("cart/charge", "PaymentController.store")
  .as("payment.store")
  .middleware(["customer"]);

// Seller dashboard
Route.group(() => {
  Route.get("/", "Seller/DashboardController.index").as("seller.dashboard");
  Route.get("/orders", "Seller/OrderController.index").as("seller.orders");
  Route.get("/profile/edit", "Seller/DashboardController.edit").as(
    "seller.edit.profile"
  );
  Route.put("/profile/edit", "Seller/DashboardController.update")
    .as("seller.edit.update")
    .validator(["SellerInfo"]);
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
  Route.get("/products", "Admin/DashboardController.products").as(
    "admin.products"
  );
}).prefix("/admin/dashboard");
// Customer
Route.group(() => {
  Route.get("/", "Customer/DashboardController.index").as("customer.dashboard");
  Route.get("/address/edit", "Customer/AddressController.create").as(
    "customer.address.create"
  );
  Route.get("/orders", "Customer/OrderController.index").as("customer.orders");

  Route.put("/address/edit", "Customer/AddressController.store")
    .as("customer.address.edit")
    .validator(["Address"]);
  Route.get("/", "Customer/DashboardController.index").as("customer.dashboard");
  Route.get("/orders", "Customer/DashboardController.orders").as(
    "customer.orders"
  );
  Route.get("/password", "Customer/PasswordController.edit").as(
    "customer.password.edit"
  );
  Route.put("/password", "Customer/PasswordController.update")
    .as("customer.password.update")
    .validator(["Password"]);
})
  .prefix("/customer/dashboard")
  .middleware(["customer"]);
// whislist
Route.get("/product/whishlist/add/:id", "Customer/WhislistController.add").as(
  "whislist.add"
);
Route.get("/whishlist/products", "Customer/WhislistController.index").as(
  "whishlist"
);
Route.get(
  "/product/whishlist/remove/:id",
  "Customer/WhislistController.removeItemFromWhishList"
).as("whishlist.remove");
