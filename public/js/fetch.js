function fechData() {
  if (window.location.pathname === "/shopping/checkout") {
    const items = localStorage.getItem("cart");
    const data = JSON.parse(items);
    if (data) {
      data.map(item => {
        $(".checkout_content").prepend(`
      
                    <div class="ui grid">
                        <div class="eight wide column">
                            <div class="ui link items divided">
                                <div class="item">
                                    <div class="ui tiny image">
                                        <img src="https://iotapp1.s3.eu-west-1.amazonaws.com/1573804728238_1573689159980_Elena%20%283%29.jpg">
                                    </div>
                                    <div class="content">
                                        <div class="header">Stevie Feliciano</div>
                                        <div class="description">
                                            <p>
                                            ${item.title}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div class="two wide column ">
                          <span class="price_${item.id}">${item.price}</span> 
                        </div>
                        <div class="two wide column">
                           <button class="  ui mini compact icon button reduce_qty" data-product_id="${
                             item.id
                           }">
                                <i class="minus icon"></i>
                           </button>  
                           <span class="qty_${item.id}">${item.qty}</span>  
                           <button class="ui mini  compact icon button add_qty" data-product_id="${
                             item.id
                           }">
                                <i class="add icon"></i>
                           </button> 
                        </div>
                        <div class="two wide column ">
                           $ <span class="total_${item.id}">${parseFloat(
          item.qty * item.price
        ).toFixed(2)}</span>  
                        </div>
                        <div class="two wide column">
                           <button class="mini ui negative basic button delete_product_from_cart" data-product_id="${
                             item.id
                           }">delete</button>
                        </div>



                    </div>
              </div>      
           
        `);
      });
    }
  }
}
