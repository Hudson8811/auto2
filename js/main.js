$(document).ready(function(){
	$(".choose-range__slide").slider({
		animate: "slow",
		range: "max",
		min: 300000,
		max: 7000000,
		step: 100000,
		value: 2000000,
		slide: function(event, ui) {
				$("#choose .choose-range-start").text('до ' + ui.value.toLocaleString() + ' р'); // для отображения
				//$("#choose #price_from").val(ui.value); // для формы
				$("#choose .choose-range__btn").attr('href', '/search/'  + 'auto-do-' +  ui.value + '-rub/'); // для адреса ссылки
		}
	});
	$("#choose .choose-range-start").text( 'до ' + ($(".choose-range__slide").slider('value').toLocaleString()) + ' р' );

	$("#tradein .choose-price").slider({
		animate: "slow",
		range: "min",
		min: 0,
		max: 2500000,
		step: 20000,
		value: 300000,
		slide: function(event, ui) {
			$("#tradein .price-range-start").text(ui.value.toLocaleString()); // для отображения
			$("#tradein .price").val(ui.value.toLocaleString()); // для формы
		}
	});
	$("#tradein .price-range-start").text($("#tradein .choose-price").slider("value").toLocaleString());

	// Пробег
	$("#tradein .choose-odometer").slider({
		animate: "slow",
		range: "min",
		min: 0,
		max: 300000,
		step: 10000,
		value: 100000,
		slide: function(event, ui) {
			$("#tradein .odometer-range-start").text(ui.value.toLocaleString()); // для отображения
			$("#tradein .odometer").val(ui.value.toLocaleString()); // для формы
		}
	});
	$("#tradein .odometer-range-start").text($("#tradein .choose-odometer").slider("value").toLocaleString());

	// Год
	$("#tradein .choose-year").slider({
		animate: "slow",
		range: "min",
		min: 1990,
		max: 2020,
		step: 1,
		value: 2005,
		slide: function(event, ui) {
			$("#tradein .year-range-start").text(ui.value); // для отображения
			$("#tradein .year").val(ui.value); // для формы
		}
	});
	$("#tradein .year-range-start").text($("#tradein .choose-year").slider("value"));
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


	// Открыть каталог автомобилей по нажантию на кнопку
	$('.header-top__catalog').click(function () {
		let sb = $('.catalog');
		if (sb.css('display') == 'block') {
			sb.fadeOut();
			$(this).removeClass('active');
		} else {
			sb.fadeIn();
			$(this).addClass('active');
		}
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

	// Открыть мобильное меню
	$('.btn-menu-mobile').click(function () {
		let sb = $('.header-top__firstline');
		if (sb.css('display') == 'block') {
			sb.fadeOut();
		} else {
			sb.fadeIn();
		};
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

		$('.main-slider-2020').slick({
			dots: false,
			arrows: false,
			infinite: true,
			speed: 500,
			fade: true,
			autoplay: true,
			cssEase: 'linear',
		});

		$('.header-slider__close').on('click', function () {
			$('.header-slider').attr('style', 'display:none;')
		});

		$('.header-slider .header-slider__slider').slick({
			dots: false,
			arrows: false,
			infinite: true,
			autoplay: true,
			vertical: true,
			verticalSwiping: true,
			speed: 500,
			autoplaySpeed: 5000,
		});

		$('.hit-slider').slick({
			dots: false,
			arrows: true,
			infinite: true,
			autoplay: true,
			speed: 500,
			autoplaySpeed: 5000,
			slidesToShow: 2,
			slidesToScroll: 2,
		});
		$('.banks-slider').slick({
			dots: true,
			arrows: false,
			infinite: true,
			autoplay: true,
			speed: 500,
			autoplaySpeed: 5000,
			slidesToShow: 5,
			slidesToScroll: 3,
			responsive: [
				{
					breakpoint: 600,
					settings: {
					slidesToShow: 2,
					slidesToScroll: 2
					}
				},
			],
		});
	});
});



















