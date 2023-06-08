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


	// Открыть каталог автомобилей по нажантию на кнопку
	/* $('.header-top__catalog').click(function () {
		let sb = $('.catalog');
		if (sb.css('display') == 'block') {
			sb.fadeOut();
			$(this).removeClass('active');
		} else {
			sb.fadeIn();
			$(this).addClass('active');
		}
	}); */

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
	/* $('.btn-menu-mobile').click(function () {
		let sb = $('.header-top__firstline');
		if (sb.css('display') == 'block') {
			sb.fadeOut();
		} else {
			sb.fadeIn();
		};
	}); */

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

	});
/*	$(document).ready(function () {
		var e = {};
		e.utm = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "device", "region", "region_name"];
		e.data = {
			tr_path: location.pathname,
			tr_city: location.hostname.split(".").shift(),
			tr_referer: document.referrer,
			tr_time: function () {
				var t = new Date;
				return t.setHours(t.getHours() + document.getTimezoneOffset() / 60 + 3), t.getTime()
			},
			tr_visit_data: {},
			cpa_click_id: null
		};
		e.parseParams = function (t, a) {
			var r = {};
			return window.location.href.replace(location.hash, "").replace(/[?&]+([^=&]+)=?([^&]*)?/gi, function (t, e, a) {
				r[e] = void 0 !== a ? a : ""
			}), t ? r[t] ? r[t] : null : (a || this.utm.forEach(function (t, a) {
				void 0 !== r[t] && (e.data.tr_visit_data[t] = r[t])
			}), r)
		};
		e.storeParams = function () {
			if (-1 === document.referrer.search(/^https?:\/\/([^\/]+\.)?avanta-avto\.ru(\/|$)/i)) {
				e.parseParams(), e.data.cpa_click_id = e.parseParams("click_id"), e.data.yclid = e.parseParams("yclid");
				try {
					var t = JSON.parse(localStorage.getItem("tr_data")) || []
				} catch (t) {
					console.log(t)
				}
				localStorage.setItem("tr_data", JSON.stringify(t));
			}
			localStorage.getItem("tr_data");
		};
		e.run = function () {
			e.storeParams();
		};
		e.run();

		location.href.includes("utm_") && $.cookie("anyone", 1, {
			expires: 30,
			path: "/"
		});

		if (location.href.includes("utm_")) {
			let headContent = document.getElementsByTagName('head')[0];
			let yametrica = document.createElement("script");
			let google = document.createElement("script");
			let metricaNoScript = document.createElement("noscript");

			headContent.insertAdjacentElement('afterEnd', yametrica);

			yametrica.type, google.type = "text/javascript";
			yametrica.async, google.async = !0;
			yametrica.textContent = '   (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};\n' +
				'   m[i].l=1*new Date();k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})\n' +
				'   (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");\n' +
				'\n' +
				'   ym(85932958, "init", {\n' +
				'        clickmap:true,\n' +
				'        trackLinks:true,\n' +
				'        accurateTrackBounce:true,\n' +
				'        webvisor:true\n' +
				'   });';
		}

		setTimeout(function () {
			if (1 != $.cookie("anyone")) {
				$.fancybox.open({
					src: '#check-popup',
					type: 'inline',
				});
			} else {
				let headContent = document.getElementsByTagName('head')[0];
				let yametrica = document.createElement("script");
				let google = document.createElement("script");
				let metricaNoScript = document.createElement("noscript");

				headContent.insertAdjacentElement('afterEnd', yametrica);

				yametrica.type, google.type = "text/javascript";
				yametrica.async, google.async = !0;
				yametrica.textContent = '   (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};\n' +
					'   m[i].l=1*new Date();k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})\n' +
					'   (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");\n' +
					'\n' +
					'   ym(85932958, "init", {\n' +
					'        clickmap:true,\n' +
					'        trackLinks:true,\n' +
					'        accurateTrackBounce:true,\n' +
					'        webvisor:true\n' +
					'   });';
			}

			$(".fancybox-close-small, #button_yes_city_check, #button_no_city_check").click(function () {
				console.log(123);
				$.cookie("anyone", 1, {
					expires: 30,
					path: "/"
				});
				$.fancybox.close();
				let headContent = document.getElementsByTagName('head')[0];
				let yametrica = document.createElement("script");
				let google = document.createElement("script");
				let metricaNoScript = document.createElement("noscript");

				headContent.insertAdjacentElement('afterEnd', yametrica);

				yametrica.type, google.type = "text/javascript";
				yametrica.async, google.async = !0;
				yametrica.textContent = '   (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};\n' +
					'   m[i].l=1*new Date();k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})\n' +
					'   (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");\n' +
					'\n' +
					'   ym(85932958, "init", {\n' +
					'        clickmap:true,\n' +
					'        trackLinks:true,\n' +
					'        accurateTrackBounce:true,\n' +
					'        webvisor:true\n' +
					'   });';
			})
			$(".fancybox-close-small, #button_yes_city_check, #button_no_city_check").on('touchstart', function () {
				console.log(123);
				$.cookie("anyone", 1, {
					expires: 30,
					path: "/"
				});
				$.fancybox.close();
				let headContent = document.getElementsByTagName('head')[0];
				let yametrica = document.createElement("script");
				let google = document.createElement("script");
				let metricaNoScript = document.createElement("noscript");

				headContent.insertAdjacentElement('afterEnd', yametrica);

				yametrica.type, google.type = "text/javascript";
				yametrica.async, google.async = !0;
				yametrica.textContent = '   (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};\n' +
					'   m[i].l=1*new Date();k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})\n' +
					'   (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");\n' +
					'\n' +
					'   ym(85932958, "init", {\n' +
					'        clickmap:true,\n' +
					'        trackLinks:true,\n' +
					'        accurateTrackBounce:true,\n' +
					'        webvisor:true\n' +
					'   });';
			})
		}, 1200)
	});*/
});