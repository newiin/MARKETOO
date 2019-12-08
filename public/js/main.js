$(document).ready(function() {
  $("#context2 .menu .item").tab({
    // special keyword works same as above
    context: "parent"
  });
  const total = parseInt(localStorage.getItem("total"));
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
  $("#btn_checkout").click(function(e) {
    e.preventDefault();
    $("#shooping_modal")
      .modal({
        closable: false,
        onDeny: function() {
          window.location.replace("/");
          return false;
        },
        onApprove: function() {
          window.location.replace("/");
        }
      })
      .modal("Fade Up")
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
    console.log(e);

    const id = $(this).data("product_id");
    $.ajax({
      url: `/cart/add/${id}`,
      type: "GET",
      dataType: "json",
      success: function({ number_of_items }) {
        localStorage.setItem("total", JSON.stringify(number_of_items));
        const total = parseInt(localStorage.getItem("total"));
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
    readonly: false,
    change_once: false, // Determines if the rating can only be set once
    ajax_method: "POST",
    url: "http://localhost/test.php",
    additional_data: {} // Additional data to send to the server
  };

  $(".rating").rate(options);
  $("#example").DataTable();
});
