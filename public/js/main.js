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
	$('.ui.dropdown').dropdown();
	$('.ui.accordion').accordion();
});
