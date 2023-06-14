$(document).ready(function(){

	// header fix

	$(window).scroll(function () {
		var top = $(window).scrollTop();
		if(top > 100){
			$(".header").addClass("header-fixed");
			$('.catalog').fadeOut();
			$('.header-top__catalog').removeClass('active');
		} else {
			$(".header").removeClass("header-fixed");
		}
	});

	// аккордеон

	$('.question').click(function () {
		$(this).toggleClass('active');
		$(this).next().slideToggle(500);
	});



	$(document).mouseup(function (e) { // событие клика по веб-документу
		var div = $(".catalog"); // тут указываем ID элемента
		var btn = $(".header-top__catalog");
//		btn.removeClass('active');
		if (!div.is(e.target) // если клик был не по нашему блоку
			&& div.has(e.target).length === 0) { // и не по его дочерним элементам
			div.fadeOut(); // скрываем его
			$('.header-top__catalog');
			if (!btn.is(e.target)) {
				btn.removeClass('active');
			}
		}
	});

	// Открыть список городов
	$('.header-top__city-select').click(function () {
		let sb = $('.cities');
		if (sb.css('display') == 'block') {
			sb.fadeOut();
		} else {
			sb.fadeIn();
		};
	});

	$(document).mouseup(function (e) { // событие клика по веб-документу
		var div = $(".cities"); // тут указываем ID элемента
		if (!div.is(e.target) // если клик был не по нашему блоку
			&& div.has(e.target).length === 0) { // и не по его дочерним элементам
			div.fadeOut(); // скрываем его
		}
	});


	$(document).mouseup(function (e) { // событие клика по веб-документу
		if(window.innerWidth < 1280) {
			var div = $(".header-top__firstline"); // тут указываем ID элемента
			if (!div.is(e.target) // если клик был не по нашему блоку
				&& div.has(e.target).length === 0) { // и не по его дочерним элементам
				div.fadeOut(); // скрываем его
			}
		}
	});
	$(document).ready(function(){

		// card slider

		$('.card-photoes-slider').slick({
			dots: true,
			infinite: true,
			slidesToShow: 1,
		});

		$('.header-slider__close').on('click', function () {
			$('.header-slider').attr('style', 'display:none;')
		});


	});
});