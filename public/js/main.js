$(document).ready(function() {
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
});
