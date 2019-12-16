// $(document).ready(function() {
//   filter_data();

//   function filter_data() {
//     var price = $(".price").val();
//     var cat = get_filter("subcategory");
//     var price = get_filter("price");
//     console.log(price);
//     console.log(cat);

//     // $.ajax({
//     //   url: "fetch_data.php",
//     //   method: "POST",
//     //   data: {
//     //    price:price,
//     //     brand: brand,
//     //     ram: ram,
//     //     storage: storage
//     //   },
//     //   success: function(data) {
//     //     $(".filter_data").html(data);
//     //   }
//     // });
//   }

//   function get_filter(class_name) {
//     var filter = [];
//     $("." + class_name + ":checked").each(function() {
//       console.log(this);

//       filter.push($(this).val());
//     });
//     return filter;
//   }

//   $(".common_selector").click(function() {
//     filter_data();
//   });
// });
