$(document).ready(function() {
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
  $("#card_total").text(total);
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
  var options = {
    max_value: 5,
    step_size: 0.5,
    initial_value: 0,
    cursor: "default",
    readonly: true,
    change_once: false
  };

  $(".rating").rate(options);
  $("#example").DataTable();
  $(".love").popup({
    inline: true
  });
  $(".love").popup({
    inline: true
  });
  // whislist
  $(".love").click(function(e) {
    e.preventDefault();
    const id = $(this).data("product_id");
    $.ajax({
      url: `/product/whishlist/add/${id}`,
      type: "GET",
      dataType: "json",
      success: total => {
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
});
