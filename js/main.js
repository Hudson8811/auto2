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
	
	var $page = $('html, body');
	$('.car-table a[href*="#"]').click(function() {
		$page.animate({
			scrollTop: $($.attr(this, 'href')).offset().top
		}, 500);
		return false;
	});

	// Ховер для боковых кнопок
	$('.btn-request').hover(function() {
		$(this).closest('.buttons').find('.btn-request-hover').addClass('hovered');
	}, function() {
		$(this).closest('.buttons').find('.btn-request-hover').removeClass('hovered');
	})














	//============================================================================================================
	// Маска
	//============================================================================================================
	// $('[name=name]').keyup(function () {
	// 	let reg = /[a-zA-Z0-9()]/g;
	// 	if (this.value.search(reg) != -1) {
	// 		this.value = this.value.replace(reg, '');
	// 	}
	// });
	var options = {

		onChange: function(cep) {
			if ((cep[3] != 9) && (cep[3] != '')) {
					$("input[name='phone']").css({
						'color': '#ff0000'
					});
			} else {
					$("input[name='phone']").css({
						'color': 'inherit'
					});
			}
		}
	};
	$('[name=phone]').mask('7 (000) 000-00-00', options);

	// Маска для формы Онлайн Кредит
	$('[name=surname], [name=middle_name], [name=former_surname], [name=Full_name_wife], [name=Maiden_name_wife], [name=Full_name_head_organization], [name=Full_name_contact_person_1], [name=Full_name_contact_person_2]').keyup(function() {
		let reg = /[a-zA-Z0-9()]/g;
		if (this.value.search(reg) != -1) {
			this.value = this.value.replace(reg, '');
		}
	});

	$('[name=Phone_wife], [name=Phone_head_organization], [name=Human_resources_phone_organization], [name=Phone_contact_person_1], [name=Phone_contact_person_2]').mask('0 (000) 000-00-00', {
		clearIfNotMatch: true
	});
	$('[name=Series_passport], [name=Series_prev_passport], [name=Series_driver_license]').mask('00 00', {
		clearIfNotMatch: true
	});
	$('[name=Number_passport], [name=Number_prev_passport], [name=Number_driver_license]').mask('000 000', {
		clearIfNotMatch: true
	});
	$('[name=International_passport]').mask('00 00 000 000', {
		clearIfNotMatch: true
	});
	$('[name=Date_birth], [name=Date_birth_wife], [name=Registration_date], [name=Date_passport], [name=Date_prev_passport], [name=Date_driver_license]').mask('00.00.0000', {
		clearIfNotMatch: true
	});
	$('[name=Unit_code_passport], [name=Unit_code_prev_passport]').mask('000-000', {
		clearIfNotMatch: true
	});
	$('[name=Average_monthly_income_family], [name=Additional_income_family]').mask('000 000 р', {
		reverse: true
	});
	$('[name=Driving_experience], [name=Work_experience_in_organization], [name=Seniority]').mask('00 лет (года)', {
		reverse: true
	});






	//============================================================================================================
	// Формы
	//============================================================================================================

	$('.btn-reserve-new').on('click', function() {

	$('#reserve-form .popup-form__title .brand-input').text($(this).attr('data-brand') + ' ' + $(this).attr('data-model'));
		// Передаем Бренд в форму
		//$('#rezerv-17-01-22 .popup-form__title .model-input').text($(this).attr('data-model')); // Передаем Модель в форму
		let carImage = $(this).attr('data-img');
		if (carImage) {
			$('#reserve-form img').attr('src', carImage);
		}
		if (!!$(this).attr('data-equip')) {
			$('#reserve-form .equip-input').val($(this).attr('data-equip'));
			// Передаем Комплектацию в форму
		} else {
			$('#reserve-form .equip-input').hide();
		}

		if (!!$(this).attr('data-price')) {
			$('#reserve-form .price-input').text($(this).attr('data-price'));
			// Передаем Цену в форму
		} else {
			$('#reserve-form .price-input').hide();
		}

	});
	// Кнопка отправка формы -Резерв
	$('.btn-reserve, .button-adv-new, hit-card__btn, red-btn-hit, hot-card__btn-red').on('click', function() {

		console.log('reserver-click');
		$('#reserve-form .popup-form__title .brand-input').text($(this).attr('data-brand') + ' ' + $(this).attr('data-model'));
		// Передаем Бренд в форму
		//$('#rezerv-17-01-22 .popup-form__title .model-input').text($(this).attr('data-model')); // Передаем Модель в форму
		let carImage = $(this).attr('data-img');
		if (this.classList.contains('btn-reserve')) {
			carImage = $('.car-card .card-carousel').length ? $('.card-carousel a.item img').attr('src') : $(this).attr('data-img');
		}
		if (carImage) {
			if ($(this).parents('#pts').length && $(window).width < 599) {
					$('#reserve-form img').hide();
			} else {
					$('#reserve-form img').show();
			}
			$('#reserve-form img').attr('src', carImage);
		}
		if (!!$(this).attr('data-equip')) {
			$('#reserve-form .equip-input').text($(this).attr('data-equip'));
			// Передаем Комплектацию в форму
		} else {
			$('#reserve-form .equip-input').hide();
		}

		if (!!$(this).attr('data-price')) {
			$('#reserve-form .price-input').text($(this).attr('data-price'));
			// Передаем Цену в форму
		} else {
			$('#reserve-form .price-input').hide();
		}

	});

	// Кнопка отправка формы -Звонок
	$('.btn-callback').on('click', function() {

		if (!!$(this).data('title')) {
			$('#callback-form .popup-form__title').text($(this).data('title'));
			// Задаем название окна
		}

	});

	// Кнопка отправка формы -Такси в кредит
	$('.btn-reserve-taxi').on('click', function() {

		if (!!$(this).data('title')) {
			$('#taxi-reserve-form .popup-form__title').text($(this).data('title'));
			// Задаем название окна
		}

		$('#taxi-reserve-form .taxi-auto-input').val($(this).data('taxi-auto'));
		// Передаем Машину Такси в форму
		$('#taxi-reserve-form .price-input').val($(this).data('price'));
		// Передаем Цену в форму

	});

	// Кнопка Trade-in фиксированная
	$('.trade-in-btn-fixed').on('click', function() {

		if (!!$(this).data('title')) {
			$('#trade-in-form .popup-form__title').text($(this).data('title'));
			// Задаем название окна
		}

	});

});













$(document).ready(function(){
	$(".js-slider_vznos").ionRangeSlider({
		grid: true,
		grid_snap: false,
		grid_num: 8,
		min: 0,
		max: 80,
		from: 25,
		postfix: "%",
		onStart: function (data) {
				$('input[name=vznos_prc]').prop("value", data.from );
		},
		onChange: function (data) {
				$('input[name=vznos_prc]').prop("value", data.from);
		}
	});
	
	$(".js-slider_time").ionRangeSlider({
		grid: true,
		min: 6,
		max: 96,
		values: [6, 12, 18, 24, 30, 36, 42, 48, 54, 60, 66, 72, 78, 84, 90, 96],
		from: 9,
		postfix: " мес",
	});

	$('input[name=vznos_prc]').on("input", function () {
		var val = $(this).prop("value");
		if (val < 0) {
				val = 0
		} else if (val > 80) {
				val = 80
		}
		$('input[name=vznos_prc]').prop("value", val);
		$('input[name=vznos_rub]').prop("value", '');
		var instance = $(".js-slider_vznos").data("ionRangeSlider");
		instance.update({
			from: val
		});




		
	});


});