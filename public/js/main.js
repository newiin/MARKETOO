$(document).ready(function() {
  addToCart();
  addToWishlist();
  deleteFromCart();
  deleteFromWishlist();
  reduceQuantity();
  addFromCartToWishlist();
  addQuantity();
  handleFiler();
  $("#context2 .menu .item").tab({
    context: "parent"
  });
  $("#tab .menu .item").tab({
    context: "parent"
  });
  const total = parseInt(localStorage.getItem("total"));
  if (isNaN(total)) {
    $("#card_total").text(0);
  } else {
    $("#card_total").text(total);
  }
  const total_whish = parseInt(localStorage.getItem("total_whish"));
  if (isNaN(total_whish)) {
    $("#love_total").text(0);
  } else {
    $("#love_total").text(total_whish);
  }

  $(".special.cards .image").dimmer({
    on: "hover"
  });

  $(".login_register").click(function() {
    $("._login_register")
      .modal({
        centered: true,
        closable: false
      })
      .modal("show");
  });

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

  function addToCart() {
    $(".add_product_to_card").click(function(e) {
      e.preventDefault();
      const id = $(this).data("product_id");
      $.ajax({
        url: `/cart/add/${id}`,
        type: "GET",
        dataType: "json",
        success: function({ number_of_items }) {
          localStorage.setItem("total", JSON.stringify(number_of_items));
          const total = parseInt(localStorage.getItem("total"));
          if (isNaN(total)) {
            $("#card_total").text(0);
          } else {
            $("#card_total").text(total);
          }
          $("#message_box").css("display", "block");
          $("#message_box").animate({ right: 0 });
          setTimeout(() => {
            $("#message_box").animate({ right: -375 });
          }, 2000);
        }
      });
    });
  }
  function deleteFromCart() {
    $(".delete_product_from_cart").click(function(e) {
      e.preventDefault();
      const id = $(this).data("product_id");
      $.ajax({
        url: `/cart/remove/${id}`,
        type: "GET",
        dataType: "json",
        success: function({ number_of_items }) {
          localStorage.setItem("total", JSON.stringify(number_of_items));
          const total = parseInt(localStorage.getItem("total"));
          $("#card_total").text(total);
          e.target.parentElement.parentElement.remove();
        }
      });
    });
  }
  function addQuantity(params) {
    $(".add_qty").click(function(e) {
      e.preventDefault();
      const id = $(this).data("product_id");
      $.ajax({
        url: `/cart/change/${id}/?product=add`,
        type: "GET",
        dataType: "json",
        success: ({ total }) => {
          const qty = parseInt($(`.qty_${id}`).text()) + 1;
          if (qty > 0) {
            $(this)
              .siblings()
              .removeClass("disabled");
          }
          const total_per_item = (
            parseFloat($(`.price_${id}`).text()) * qty
          ).toFixed(2);
          $(`.qty_${id}`).text(qty);
          $(`.total_${id}`).text(total_per_item);
          $("#subtotal").text(total);
        }
      });
    });
  }

  function reduceQuantity(params) {
    $(".reduce_qty").click(function(e) {
      e.preventDefault();
      const id = $(this).data("product_id");
      $.ajax({
        url: `/cart/change/${id}/?product=reduce`,
        type: "GET",
        dataType: "json",
        success: ({ total }) => {
          const qty = parseInt($(`.qty_${id}`).text()) - 1;
          if (qty == 0) {
            $(this).addClass("disabled");
          }
          const total_per_item = (
            parseFloat($(`.price_${id}`).text()) * qty
          ).toFixed(2);
          $(`.qty_${id}`).text(qty);
          $(`.total_${id}`).text(total_per_item);
          $("#subtotal").text(total);
        }
      });
    });
  }

  // whislist
  function addToWishlist() {
    $(".love").click(function(e) {
      e.preventDefault();
      const id = $(this).data("product_id");
      $.ajax({
        url: `/product/whishlist/add/${id}`,
        type: "GET",
        dataType: "json",
        success: total => {
          console.log(total);

          localStorage.setItem("total_whish", JSON.stringify(total));
          const total_whish = parseInt(localStorage.getItem("total_whish"));
          if (isNaN(total_whish)) {
            $("#love_total").text(0);
          } else {
            $("#love_total").text(total_whish);
          }
        }
      });
    });
  }
  function deleteFromWishlist() {
    $(".delete_product_from_whishlist").click(function(e) {
      e.preventDefault();
      const id = $(this).data("product_id");
      $.ajax({
        url: `/product/whishlist/remove/${id}`,
        type: "GET",
        dataType: "json",
        success: function({ total }) {
          localStorage.setItem("total_whish", JSON.stringify(total));
          const total_whish = parseInt(localStorage.getItem("total_whish"));
          if (isNaN(total_whish)) {
            $("#love_total").text(0);
          } else {
            $("#love_total").text(total_whish);
          }
          e.target.parentElement.parentElement.remove();
        }
      });
    });
  }

  function addFromCartToWishlist() {
    $(".add_product_from_whishlist_to_card").click(function(e) {
      e.preventDefault();
      const id = $(this).data("product_id");
      const total_whish = parseInt(localStorage.getItem("total_whish") - 1);
      localStorage.setItem("total_whish", JSON.stringify(total_whish));
      $("#love_total").text(total_whish);
      if (isNaN(total)) {
        $("#card_total").text(0);
      } else {
        $("#card_total").text(total);
      }
      $.ajax({
        url: `/cart/add/${id}`,
        type: "GET",
        dataType: "json",
        success: function() {
          $.ajax({
            url: `/product/whishlist/remove/${id}`,
            type: "GET",
            dataType: "json",
            success: () => {
              e.target.parentElement.parentElement.remove();
            }
          });
        }
      });
    });
  }

  function handleFiler() {
    let subcategory = get_filter("subcategory");
    let price = get_filter("price");
    const slug = $("#slug").val();
    let filter = $("#filter");
    $.ajax({
      url: `/products/filter`,
      type: "POST",
      dataType: "json",
      data: { subcategory, slug, price },
      success: function(products) {
        $("#tab").hide();
        filter.show();
        let items = "";

        products.map(product => {
          items += `
              <div class="ui grid ">
                               
                                <div class="sixteen wide column">
                                    <div class="ui items">
                                        <div class="item">
                                            <div class="image" style="background-image:url('${product.images[0].url}');
                                                background-position: center !important;
                                                background-repeat: no-repeat !important;
                                                background-size: cover !important;
                                                margin: 0 !important;
                                                ">
                                            </div>
                                            <div class="content">
                                                <a class="mini header product_title"
                                                    href="/product/${product.slug}">${product.title}</a>
                                                <div class="meta">
                                                    <span class="price">$ ${product.price}</span>

                                                </div>
                                                <div class="description">

                                                </div>
                                                <div class="extra btns_wrapper">
                                                    <button
                                                        class="ui mini compact left floated button add_product_to_card"
                                                        data-product_id="${product.id}">
                                                        Add to Cart
                                                    </button>
                                                    <button class="ui mini compact left floated button liked love"
                                                        data-product_id="${product.id}">
                                                        <i class=" heart outline icon "></i>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
            
            `;
        });

        filter
          .html(items)
          .promise()
          .done(() => {
            addToCart();
            addToWishlist();
          });
        if (subcategory.length === 0 && price.length === 0) {
          $("#tab").show();
        }
      }
    });
  }

  function get_filter(class_name) {
    var filter = [];
    $("." + class_name + ":checked").each(function() {
      filter.push($(this).val());
    });
    return filter;
  }

  $(".common_selector").click(function() {
    handleFiler();
  });

  let options = {
    max_value: 5,
    step_size: 0.5,
    initial_value: 0,
    cursor: "default",
    readonly: true,
    change_once: false
  };

  $(".rating").rate(options);
  $("#example").DataTable();
});
