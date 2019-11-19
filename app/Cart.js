const ls = require("local-storage");
const Product = use("App/Models/Product");
class Cart {
  // constructor(id, name, price, count) {
  //   this.id = id;
  //   this.name = name;
  //   this.price = price;
  //   this.count = count;
  //   this.saveCart();
  // }
  constructor(count) {
    this.count = count;
    this.saveCart();
  }
  cart = [];

  saveCart() {
    ls.set("shoppingCart", JSON.stringify(this.cart));
  }
  getCart() {
    return ls.get("shoppingCart");
  }

  addItemToCart(id) {
    const found = this.cart.find(element => element === id);
    if (found) {
      this.cart[i].count += count;
      this.saveCart();
      return;
    }
    // const product=await Product.findOrFail(id)
    this.cart.push({ id });
    this.saveCart();
  }

  removeItemFromCart(id) {
    this.cart = this.cart.filter(item => {
      item !== id;
    });
    this.saveCart();
  }

  removeItemFromCartAll() {
    this.cart = [];
    saveCart();
  }
  countCart() {
    const totalCount = 0;
    for (var i in this.cart) {
      totalCount += this.cart[i].count;
    }

    return totalCount;
  }

  totalCart() {
    const totalCost = 0;
    for (var i in cart) {
      totalCost += this.cart[i].price * this.cart[i].count;
    }
    return totalCost.toFixed(2);
  }
}

module.exports = Cart;
