$(document).ready(function() {
  var total = 0;
  fechData();
  $(".special.cards .image").dimmer({
    on: "hover"
  });

  $(".login_register").click(function() {
    $("#login_register")
      .modal({
        centered: true,
        closable: false
      })
      .modal("show");
  });

  $("#example").DataTable();
  $(".ui.dropdown").dropdown();
  $(".ui.accordion").accordion();

  $("#submit_image").click(function() {
    $("#dropzoneFrom").submit();
  });

  $(".alert-notification").fadeIn("slow", function() {
    $(".alert-notification")
      .delay(5000)
      .fadeOut();
    setTimeout("location.reload(true);", 3000);
  });
  $(".add_product_to_card").click(function(e) {
    e.preventDefault();
    const id = $(this).data("product_id");
    console.log(id);

    $.ajax({
      url: `/cart/add/${id}`,
      type: "GET",
      dataType: "json",
      success: function({ cart, total }) {
        console.log(cart);

        localStorage.setItem("cart", JSON.stringify(cart));
        $("#card_total").text(total);
      }
    });
  });
  $(".delete_product_from_cart").click(function(e) {
    e.preventDefault();
    const id = $(this).data("product_id");

    $.ajax({
      url: `/cart/remove/${id}`,
      type: "GET",
      dataType: "json",
      success: function({ cart }) {
        console.log(cart);
        localStorage.setItem("cart", JSON.stringify(cart));
        e.target.parentElement.parentElement.remove();
        console.log(e.target.parentElement.parentElement.parentElement);
      }
    });
  });

  $(".add_qty").click(function(e) {
    e.preventDefault();
    const id = $(this).data("product_id");
    console.log(id);

    $.ajax({
      url: `/cart/change/${id}/?product=add`,
      type: "GET",
      dataType: "json",
      success: function({ cart }) {
        console.log(cart);

        // console.log(cart);
        // localStorage.setItem("cart", JSON.stringify(cart));
        // e.target.parentElement.parentElement.remove();
        // console.log(e.target.parentElement.parentElement.parentElement);
      }
    });
  });

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
                        <div class="two wide column">
                           $  ${item.price}
                        </div>
                        <div class="two wide column">
                           <button class="  ui mini compact icon button reduce_qty" data-product_id="${
                             item.id
                           }">
                                <i class="minus icon"></i>
                           </button>  
                              ${item.qty}
                           <button class="ui mini  compact icon button add_qty" data-product_id="${
                             item.id
                           }">
                                <i class="add icon"></i>
                           </button> 
                        </div>
                        <div class="two wide column">
                           $ ${(item.qty * item.price).toFixed(2)}
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
});
