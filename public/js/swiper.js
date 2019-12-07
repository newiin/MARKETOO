var swiper = new Swiper(".swiper-container", {
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
});
