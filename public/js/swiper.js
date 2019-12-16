var swiper = new Swiper(".swiper-containers", {
  slidesPerView: 3,
  spaceBetween: 30,
  freeMode: true,
  loop: true,
  autoplay: {
    delay: 2500,
    disableOninteraction: false
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev"
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true
  }
});
var galleryThumbs = new Swiper(".gallery-thumbs", {
  spaceBetween: 1,
  slidesPerView: 4,
  freeMode: true
});
var galleryTop = new Swiper(".gallery-top", {
  spaceBetween: 1,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev"
  },
  thumbs: {
    swiper: galleryThumbs
  }
});
$(document).ready(function() {
  $("#vertical").lightSlider({
    gallery: true,
    item: 1,
    vertical: false,
    controls: false,
    verticalHeight: 295,
    vThumbWidth: 50,
    thumbItem: 8,
    thumbMargin: 4,
    slideMargin: 0
  });

  // function handleFiler() {
  //   let subcategory = [];
  //   let slug;
  //   let filter = $("#filter");

  //   $(".subcategory").change(function() {
  //     const total_checkbox_checked = $(".subcategory:checkbox").filter(
  //       ":checked"
  //     );
  //     if (this.checked) {
  //       const value = parseInt(this.value);
  //       subcategory.push(value);

  //       slug = $("#slug").val();
  //     } else {
  //       subcategory = subcategory.filter(item => {
  //         return item !== parseInt(this.value);
  //       });
  //     }

  //     // $.ajax({
  //     //   url: `/products/filter`,
  //     //   type: "POST",
  //     //   dataType: "json",
  //     //   data: { subcategory, slug },
  //     //   success: function(products) {
  //     //     $("#tab").hide();
  //     //     filter.show();
  //     //     let items = "";
  //     //     products.map(product => {
  //     //       items += `
  //     //         <div class="ui grid ">

  //     //                           <div class="sixteen wide column">
  //     //                               <div class="ui items">
  //     //                                   <div class="item">
  //     //                                       <div class="image" style="background-image:url('${product.images[0].url}');
  //     //                                           background-position: center !important;
  //     //                                           background-repeat: no-repeat !important;
  //     //                                           background-size: cover !important;
  //     //                                           margin: 0 !important;
  //     //                                           ">
  //     //                                       </div>
  //     //                                       <div class="content">
  //     //                                           <a class="mini header product_title"
  //     //                                               href="/product/${product.slug}">${product.title}</a>
  //     //                                           <div class="meta">
  //     //                                               <span class="price">$ ${product.price}</span>

  //     //                                           </div>
  //     //                                           <div class="description">

  //     //                                           </div>
  //     //                                           <div class="extra btns_wrapper">
  //     //                                               <button
  //     //                                                   class="ui mini compact left floated button add_product_to_card"
  //     //                                                   data-product_id="${product.id}">
  //     //                                                   Add to Cart
  //     //                                               </button>
  //     //                                               <button class="ui mini compact left floated button liked love"
  //     //                                                   data-product_id="${product.id}">
  //     //                                                   <i class=" heart outline icon "></i>
  //     //                                               </button>
  //     //                                           </div>
  //     //                                       </div>
  //     //                                   </div>

  //     //                               </div>
  //     //                           </div>
  //     //                       </div>

  //     //       `;
  //     //     });

  //     //     filter
  //     //       .html(items)
  //     //       .promise()
  //     //       .done(() => {
  //     //         addToCart();
  //     //         addToWishlist();
  //     //       });
  //     //     if (total_checkbox_checked.length == 0) {
  //     //       $("#tab").show();
  //     //     }
  //     //   }
  //     // });
  //   });
  // }
});
