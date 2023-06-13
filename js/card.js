; /* Start:"a:4:{s:4:"full";s:77:"/local/components/auto.2019/equip-row/templates/line/script.js?16838728182564";s:6:"source";s:62:"/local/components/auto.2019/equip-row/templates/line/script.js";s:3:"min";s:0:"";s:3:"map";s:0:"";}"*/
    // Сравнение комплектаций
	$('.btn_add_compare').click(function() {

        let parent = $(this).parents('.equip-line-item');
        let eq_id = $('#compare-form input[name="equips_id"]').val();
        $(this).hide(200);
        parent.addClass('added_compare');
        $('#compare-form .btn_compare').slideDown(200);

        $('#compare-form input[name="equips_id"]').val( eq_id + '|' + $(this).data('equip-id') ); // Добавляем id комплектации в форму
	});

    // Кнопка печать
	$('.btn-print').click(function() {

        let parent = $(this).parents('.equip-line-item');

        $('.equip-line-item').removeClass('go-print');
        $('.equip-line-item').addClass('delete-print');
        
        parent.removeClass('delete-print');
        parent.addClass('go-print');

        window.print();
	});

    // Раскрытие опций
    $(document).ready(function() {

        $('.equip-line-desctop .more-open').click(function() {

            let parent = $(this).closest('.equip-line-item');

            if ($(this).hasClass('active')) {
                parent.find('.row-opened').slideUp(200);
            } else {
                $('.row-opened').slideUp(200);
                parent.find('.row-opened').slideDown(200);
            }

            $(this).parent().find('.more-open').toggleClass('active');
            return false;
        });


        $('.option-price').change(function() {

            var parent = $(this).closest('.row-opened');

            // Сумма цен доп. опций
            let optionPriceSUM = 0;
            parent.find('.option-price').each(function() {
                if ($(this).prop('checked')) {
                    optionPriceSUM += +$(this).val();
                }
            })

            let eqPriceVal = +parent.find('.eq-price').text().replace(/\s/g, ''); // Цена комплектации

            let eqFinalPrice = 0;
            eqFinalPrice = eqPriceVal + optionPriceSUM; // Цена комплектации + сумма доп. опций

            parent.find('.sum-option-price').fadeOut(0).fadeIn('slow').text(optionPriceSUM.toLocaleString()); // Задаем Сумму доп. опций
            parent.find('.final-price').fadeOut(0).fadeIn('slow').text(eqFinalPrice.toLocaleString()); // Задаем Финайльный прайс (Цена комплектации + сумма доп. опций)

        });

    });
/* End */
;
; /* Start:"a:4:{s:4:"full";s:84:"/local/components/auto.2019/equip-row/templates/line-mobile/script.js?16838728632573";s:6:"source";s:69:"/local/components/auto.2019/equip-row/templates/line-mobile/script.js";s:3:"min";s:0:"";s:3:"map";s:0:"";}"*/
    // Сравнение комплектаций
	$('.btn_add_compare').click(function() {

        let parent = $(this).parents('.equip-line-item');
        let eq_id = $('#compare-form input[name="equips_id"]').val();
        $(this).hide(200);
        parent.addClass('added_compare');
        $('#compare-form .btn_compare').slideDown(200);

        $('#compare-form input[name="equips_id"]').val( eq_id + '|' + $(this).data('equip-id') ); // Добавляем id комплектации в форму
	});

    // Кнопка печать
	$('.btn-print').click(function() {

        let parent = $(this).parents('.equip-line-item');

        $('.equip-line-item').removeClass('go-print');
        $('.equip-line-item').addClass('delete-print');
        
        parent.removeClass('delete-print');
        parent.addClass('go-print');

        window.print();
	});

    //Cookies.set('tester', '1');

    // Раскрытие опций
    $(document).ready(function() {

        $('.equip-line-mobile .more-open').click(function() {

            let parent = $(this).closest('.equip-line-item');

            if ($(this).hasClass('active')) {
                parent.find('.row-opened').slideUp(200);
            } else {
                $('.row-opened').slideUp(200);
                parent.find('.row-opened').slideDown(200);
            }

            $(this).parent().find('.more-open').toggleClass('active');
        });


        $('.option-price').change(function() {

            var parent = $(this).closest('.row-opened');

            // Сумма цен доп. опций
            let optionPriceSUM = 0;
            parent.find('.option-price').each(function() {
                if ($(this).prop('checked')) {
                    optionPriceSUM += +$(this).val();
                }
            })

            let eqPriceVal = +parent.find('.eq-price').text().replace(/\s/g, ''); // Цена комплектации

            let eqFinalPrice = 0;
            eqFinalPrice = eqPriceVal + optionPriceSUM; // Цена комплектации + сумма доп. опций

            parent.find('.sum-option-price').fadeOut(0).fadeIn('slow').text(optionPriceSUM.toLocaleString()); // Задаем Сумму доп. опций
            parent.find('.final-price').fadeOut(0).fadeIn('slow').text(eqFinalPrice.toLocaleString()); // Задаем Финайльный прайс (Цена комплектации + сумма доп. опций)

        });

    });
/* End */
;
; /* Start:"a:4:{s:4:"full";s:89:"/local/templates/auto.2020/components/bitrix/news.list/hot-deals/script.js?16606627254463";s:6:"source";s:74:"/local/templates/auto.2020/components/bitrix/news.list/hot-deals/script.js";s:3:"min";s:0:"";s:3:"map";s:0:"";}"*/
$(function () {

    /*const observer = lozad();
     observer.observe();*/

    function setAutoHeightForHotsCard() {
        //$('.new-big-carousel').autoHeight({
        //    selector: '.new-item'
        //});

        $('.new-big-carousel').each(function (i, e) {

            var is_slider = $(e).hasClass('with-carousel');
            console.log('is_slider='+is_slider);

            $(e).find('.new-item .new-desc').css('height', 'auto');
            
            
            
            var itms = [];
            $(e).find('.new-item .new-desc').each(function (i, e) {
                var ob = {
                    elm: $(e),
                    h: $(e).outerHeight(),
                    y: Math.round($(e).offset().top, 0)
                }
                itms.push(ob);
            });
            if (itms.length > 0) {
                console.log(itms);

                var rowItms = [];
                var last_y = itms[0].y;
                var max_h = 0;
                for (var i = 0; i < itms.length; i++) {
                    if (is_slider || (Math.abs(last_y - itms[i].y)<3) ){
                        if (max_h < itms[i].h) {
                            max_h = itms[i].h;
                        }
                        rowItms.push(itms[i]);
                    } else {
                        if (rowItms.length > 0 && max_h > 0) {
                            for (var j = 0; j < rowItms.length; j++) {
                                //console.log(rowItms[j]);
                                $(rowItms[j].elm).css('height', (max_h-25) + 'px');
                            }
                        }
                        //console.log(rowItms, max_h);
                        max_h = 0;
                        last_y = itms[i].y;
                        rowItms = [];
                        rowItms.push(itms[i]);
                    }
                }
                
                if (is_slider) {
                    console.log('max_h'+max_h);
                    for (var i = 0; i < itms.length; i++) 
                        $(itms[i].elm).css('height', (max_h) + 'px');
                }
                
            }


        });


    }

    setAutoHeightForHotsCard();
    $(window).on('resize', setAutoHeightForHotsCard);

    $('.new-big-carousel.with-carousel').slick({
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        dots: false,
        arrows: false,
        autoplay: false, //true,
        autoplaySpeed: 5000,
        responsive: [
            {
                breakpoint: 991,
                settings: {
                    slidesToShow: 2
                }
            },
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 1
                }
            }
        ]
    });

    $('.new-carousel').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,
        dots: false,
        arrows: false,
        autoplay: false,
        autoplaySpeed: 5000,
        speed: 800
    });

    $('.show-all-brands').on("click", function (e) {
        e.preventDefault();
        var buttonText = $(this).text() == "Показать все" ? "Скрыть" : "Показать все";
        $(this).text(buttonText);
        $(".filter-brand .mobile-item").toggleClass("mobile-hidden");
    });

    var wWidth = document.documentElement.clientWidth;
    if (wWidth <= 413) {
        $('.filter-brand .filter-item').removeClass("mobile-item mobile-hidden");

        var filterItems = $('.filter-brand .filter-item[data-sort]');
        var arItems = $.makeArray(filterItems);
        arItems.sort(function (a, b) {
            return $(b).data("sort") - $(a).data("sort")
        });
        $(arItems).appendTo(".filter-brand");

        var brandCounter = 0;
        $('.filter-brand .filter-item[data-sort]').each(function () {
            if (brandCounter >= 4)
                $(this).addClass("mobile-item mobile-hidden");
            brandCounter++;
        });
    }

    /*var maxItemHeight = 0;
     $(".new-big-carousel .new-desc").each(function () {
     if ($(this).outerHeight() > maxItemHeight) maxItemHeight = $(this).outerHeight();
     });
     $(".new-big-carousel .new-desc").css("height", maxItemHeight);*/

});
/* End */
;
; /* Start:"a:4:{s:4:"full";s:79:"/local/components/auto.2019/cars/templates/.default/js/script.js?16364551588305";s:6:"source";s:64:"/local/components/auto.2019/cars/templates/.default/js/script.js";s:3:"min";s:0:"";s:3:"map";s:0:"";}"*/
	// Цвета
	$('.js-color-change').on('click', function() {
		let img = $(this).data('img');
		let name = $(this).data('name');
		let link = $(this).data('link');

		$('#main-img').attr('src', img);
		$('.js-color-change').css('height', '13px');
		$(this).css('height', '20px');
		$('.offer-main__color-name span.dots_colors').hide();
		$('.offer-main__color-name a.link_color_name').text(name);
		$('.offer-main__color-name a.link_color_name').attr('href', link);
		return false;
	});

	$(document).ready(function() {
		$(".btn-to-form").on("click", function(event) {
			event.preventDefault();
			let btnToForm = $(this).attr('href'),
				top = $(btnToForm).offset().top;
			$('body, html').animate({
				scrollTop: top
			}, 500);
		});

		let eqPriceVal = $('.js_eq_price .eq-price');
		var eqPriceMap = eqPriceVal.map(function() {
			//console.log($(this).text());
			//console.log($(this).text());
			return $(this).text();
		}).get();
		$('#price-model').text(eqPriceMap[0].replace('от', ''));

		//$('#bcb2').trigger("click");
	});


	// Скидки
	$('.discount-check').change(function() {

		let priceModelVal = +($('#price-model').text().replace(/\s/g, '')).replace('от', ''); // Цена модели со скидками
		let profitVal = +$('#profit').text().replace(/\s/g, ''); // Выгода
		let discountVal = +$(this).val().replace(/\s/g, ''); // Показатель текущей(нажатой) программы-скидки

		// Формируем массив цен комплектаций
		let eqPriceVal = $('.js_eq_price .eq-price');
		var eqPriceMap = eqPriceVal.map(function() {
			return +($(this).text().replace(/\s/g, '')).replace('от', '');
		}).get();


		if ($(this).is(":checked")) {

			// Если нажата скидка Господдержка
			if ($(this).hasClass("gos-check")) {

				for (let i = 0; i < eqPriceMap.length; i++) {
					let eqPrice_10pc = Math.round( +$('.eq-price-10pc-' + i).val() ); // Считаем 10% от исходной цены комплектации
					let eqPrice = eqPriceMap[i] - eqPrice_10pc; // Цена комплектации с 10% скидкой
					$('.eq-' + i + ' .eq-price').fadeOut(0).fadeIn('slow').text(eqPrice.toLocaleString()); // Меняем цену комплектации

					// Сумма цен доп. опций
					var optionPriceSUM = 0;
					$('.eq-' + i + ' .option-price').each(function(){
						if ($(this).prop('checked')) {
							optionPriceSUM += +$(this).val();
						}
					})

					let eqFinalPrice = 0;
					eqFinalPrice = eqPrice + optionPriceSUM; // Цена комплектации + сумма доп. опций
					$('.eq-' + i + ' .sum-option-price').fadeOut(0).fadeIn('slow').text(optionPriceSUM.toLocaleString()); // Задаем Сумму доп. опций
					$('.eq-' + i + ' .final-price').fadeOut(0).fadeIn('slow').text(eqFinalPrice.toLocaleString()); // Задаем Финайльный прайс (Цена комплектации + сумма доп. опций)
				}
			// Если нажата обычная скидка
			} else {

				var profit = profitVal + discountVal; // Выгода (Сумма скидок)
				var priceModel = priceModelVal - discountVal; // Цена модели со скидками

				for (let i = 0; i < eqPriceMap.length; i++) {
					let eqPrice = eqPriceMap[i] - discountVal;
					$('.eq-' + i + ' .eq-price').fadeOut(0).fadeIn('slow').text(eqPrice.toLocaleString('ru-RU')); // Меняем цену комплектации

					// Сумма цен доп. опций
					var optionPriceSUM = 0;
					$('.eq-' + i + ' .option-price').each(function(){
						if ($(this).prop('checked')) {
							optionPriceSUM += +$(this).val();
						}
					})

					let eqFinalPrice = 0;
					eqFinalPrice = eqPrice + optionPriceSUM; // Цена комплектации + сумма доп. опций
					$('.eq-' + i + ' .sum-option-price').fadeOut(0).fadeIn('slow').text(optionPriceSUM.toLocaleString('ru-RU')); // Задаем Сумму доп. опций
					$('.eq-' + i + ' .final-price').fadeOut(0).fadeIn('slow').text(eqFinalPrice.toLocaleString('ru-RU')); // Задаем Финайльный прайс (Цена комплектации + сумма доп. опций)
				}
			}

		} else {

			// Если нажата скидка Господдержка
			if ($(this).hasClass("gos-check")) {

				for (let i = 0; i < eqPriceMap.length; i++) {
					let eqPrice_10pc = Math.round( +$('.eq-price-10pc-' + i).val() );
					let eqPrice = eqPriceMap[i] + eqPrice_10pc;
					$('.eq-' + i + ' .eq-price').fadeOut(0).fadeIn('slow').text(eqPrice.toLocaleString()); // Меняем цену комплектации

					// Сумма цен доп. опций
					var optionPriceSUM = 0;
					$('.eq-' + i + ' .option-price').each(function(){
						if ($(this).prop('checked')) {
							optionPriceSUM += +$(this).val();
						}
					})

					let eqFinalPrice = 0;
					eqFinalPrice = eqPrice + optionPriceSUM; // Цена комплектации + сумма доп. опций
					$('.eq-' + i + ' .sum-option-price').fadeOut(0).fadeIn('slow').text(optionPriceSUM.toLocaleString()); // Задаем Сумму доп. опций
					$('.eq-' + i + ' .final-price').fadeOut(0).fadeIn('slow').text(eqFinalPrice.toLocaleString()); // Задаем Финайльный прайс (Цена комплектации + сумма доп. опций)
				}
			// Если нажата обычная скидка
			} else {

				var profit = profitVal - discountVal; // Выгода (Сумма скидок)
				var priceModel = priceModelVal + discountVal; // Цена модели со скидками

				for (let i = 0; i < eqPriceMap.length; i++) {
					let eqPrice = eqPriceMap[i] + discountVal;
					$('.eq-' + i + ' .eq-price').fadeOut(0).fadeIn('slow').text(eqPrice.toLocaleString('ru-RU')); // Меняем цену комплектации

					// Сумма цен доп. опций
					var optionPriceSUM = 0;
					$('.eq-' + i + ' .option-price').each(function(){
						if ($(this).prop('checked')) {
							optionPriceSUM += +$(this).val();
						}
					})

					let eqFinalPrice = 0;
					eqFinalPrice = eqPrice + optionPriceSUM; // Цена комплектации + сумма доп. опций
					$('.eq-' + i + ' .sum-option-price').fadeOut(0).fadeIn('slow').text(optionPriceSUM.toLocaleString('ru-RU')); // Задаем Сумму доп. опций
					$('.eq-' + i + ' .final-price').fadeOut(0).fadeIn('slow').text(eqFinalPrice.toLocaleString('ru-RU')); // Задаем Финайльный прайс (Цена комплектации + сумма доп. опций)
				}
			}
		}


		if ( !$(this).hasClass("gos-check") ) {
			$('#profit, .eq-profit').hide().fadeIn('slow').text(profit.toLocaleString('ru-RU'));
			$('#price-model').hide().fadeIn('slow').text(priceModel.toLocaleString('ru-RU'));
		}
	});

	// Показать все характеристики
    $(document).ready(function() {
        // $('.collapse-chars').hide();

        $('.sheet .sheet__more').click(function() {

            if ($(this).hasClass('btn-collapse')) {
                $('.collapse-chars').hide({
                    duration: 500,
                    easing: "linear",
                    complete: function() { // callback
                        $('.sheet .sheet__more').text('Показать все Характеристики');
                    },
                    queue: false // не ставим в очередь
                });
            } else {
                $('.collapse-chars').show({
                    duration: 500,
                    easing: "linear",
                    complete: function() { // callback
                        $('.sheet .sheet__more').text('Свернуть Характеристики');
                    },
                    queue: false // не ставим в очередь
                });
            }

            $(this).toggleClass('btn-collapse');
            return false;
        });
    });

/* End */
;; /* /local/components/auto.2019/equip-row/templates/line/script.js?16838728182564*/
; /* /local/components/auto.2019/equip-row/templates/line-mobile/script.js?16838728632573*/
; /* /local/templates/auto.2020/components/bitrix/news.list/hot-deals/script.js?16606627254463*/
; /* /local/components/auto.2019/cars/templates/.default/js/script.js?16364551588305*/