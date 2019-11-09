var swiper = new Swiper('.swiper-container', {
  slidesPerView: 3,
  spaceBetween: 30,
  freeMode: true,
  loop: true,
  autoplay: {
    delay: 2500,
    disableOninteraction: false
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev'
  },
  pagination: {
    el: '.swiper-pagination',
    clickable: true
  }
});
$(document).ready(function() {
  $('.special.cards .image').dimmer({
    on: 'hover'
  });
  $('.login_register').click(function() {
    $('#login_register')
      .modal({
        centered: true,
        closable: false
      })
      .modal('show');
  });
  $('.forgot_pass').click(function() {
    const form1 = $('.login_register_wrapper');
    const html = $('#register_seller').css('display', 'block');
    form1.replaceWith(html);
    console.log($('#my_error').text());
  });
  // $('.forgot_pass').click(() => {

  //   $('#register_seller').show();
  // });

  $('.ui.dropdown').dropdown();
  $('.ui.accordion').accordion();
});
