

$(document).ready(function () {

    console.log('xxx2');
});

(function (window) {

    if (!!window.JSRsmCalc)
    {
        return;
    }

    window.JSRsmCalc = function (arParams){ 
        //данные получаемые с сервера
        this.pathTempl = arParams.pathTempl;
        this.arRsmPrograms = arParams.arRsmPrograms;
        this.inst = {
            jsRsmVznos : $(".js-slider_vznos"),
            jsRsmTime : $(".js-slider_time"),
            jsRsmVznosPrc : $('input[name=vznos_prc]'),
            jsRsmVznosRub : $('input[name=vznos_rub]'),
        }

        this.formatter = new Intl.NumberFormat();
        
        this.default_PREVILEGIES = $('.rsm_preimushestva .require-block__list');


        //console.log(arParams);
        this.Init();
    }


    //~~~~~~~~~~~~~~~~~~~~~~
    //инициализация 
    window.JSRsmCalc.prototype.Init = function ()
    {
        $this = this;
        this.InitSlidersHandlers();
        
        this.getModels();

        this.initOtherHandlers();

        //первоначальная попытка калькуляции
        this.calc();

    }


    //====================================================================================================================
    //инит всякого-разного
    window.JSRsmCalc.prototype.InitSlidersHandlers = function () {
        $this = this;

        this.inst.jsRsmVznos.ionRangeSlider({
            skin: "flat",
            grid: true,
            grid_snap: false,
            grid_num: 8,
            min: 0,
            max: 80,
            //step: 1,
            from: 25,
            postfix: "%",
            onStart: function (data) {
                $this.inst.jsRsmVznosPrc.prop("value", data.from );
                $this.update_vznos_rub(data.from);
            },
            onChange: function (data) {
                $this.inst.jsRsmVznosPrc.prop("value", data.from);
                $this.update_vznos_rub(data.from);
                $this.calc();
            }
        });

        this.inst.jsRsmTime.ionRangeSlider({
            skin: "flat",
            grid: true,
            //grid_snap: false, 
            //grid_num: 4,
            min: 6,
            max: 96,
            values: [6, 12, 18, 24, 30, 36, 42, 48, 54, 60, 66, 72, 78, 84, 90, 96],
            //step: 6,
            from: 9,
            postfix: " мес",
            onChange: function (data) {
                $this.calc();
            }
        });



        $this.inst.jsRsmVznosRub.bind("change keyup input click", function () {
            if (this.value.match(/[^0-9]/g)) {
                this.value = this.value.replace(/[^0-9]/g, '');
            }
        });

        $this.inst.jsRsmVznosRub.on("input", function () {
            var val = $(this).prop("value");
            var price = $('.js-compl').find('option:selected').data('price');
            if (price) {

                // validate
                if (val < 0) {
                    val = 0
                } else if (val > price) {
                    val = price
                }

                var prc = val * 100 / price;
                if (prc > 80)
                    prc = 80;
                val = prc * price / 100;
                $this.inst.jsRsmVznosRub.prop("value", Math.round(val));
                $this.inst.jsRsmVznosPrc.prop("value", Math.round(prc));

                var instance = $this.inst.jsRsmVznos.data("ionRangeSlider");
                instance.update({
                    from: prc
                });
                
                $this.calc();

            } else {
                //this.inst.jsRsmVznosRub.prop("value", '');
                alert('Невозможно вычислить % первоначального взноса, для этого сначала выберите комплектацию.');
            }

        });



        //взнос в %
        $this.inst.jsRsmVznosPrc.bind("change keyup input click", function () {
            if (this.value.match(/[^0-9]/g)) {
                this.value = this.value.replace(/[^0-9]/g, '');
            }
        });

        $this.inst.jsRsmVznosPrc.on("input", function () {
            var val = $(this).prop("value");
            // validate
            if (val < 0) {
                val = 0
            } else if (val > 80) {
                val = 80
            }
            $this.inst.jsRsmVznosPrc.prop("value", val);
            $this.inst.jsRsmVznosRub.prop("value", '');
            var instance = $this.inst.jsRsmVznos.data("ionRangeSlider");
            instance.update({
                from: val
            });
        });


    }


    //====================================================================================================================
    //взнос в руб
    window.JSRsmCalc.prototype.update_vznos_rub = function(prc) {
        var price = $('.js-compl').find('option:selected').data('price');
        if (price) {
            var val = prc * price / 100;
            this.inst.jsRsmVznosRub.prop("value", Math.round(val));
        } else {
            this.inst.jsRsmVznosRub.prop("value", '');
        }
    }





    //====================================================================================================================
    // Получаем модели с комплектациями, при загрузке страницы
    window.JSRsmCalc.prototype.getModels = function () {

        $this = this;
        let currentUri = window.location.href;
        let arrUri = currentUri.split('/');
        
        var url = new URL(currentUri);
		var searchParams = new URLSearchParams(url.search.substring(1));
		var type = searchParams.get("type");

        if (!!arrUri[4] && !!arrUri[5]) {

            let brandCode = arrUri[4];
            let modelCode = arrUri[5];

            // Все модели по бренду для калькулятора
            $.get(this.pathTempl + 'ajax-model.php', {brandCode: brandCode, modelCode: modelCode})
                    .done(function (response) {
                        $('.js-model').html(response);
                    })

            // Фото модели для калькулятора
            $.get(this.pathTempl + 'car_img.php', {modelCode: modelCode})
                    .done(function (response) {
                        $('#right-area').html('').fadeOut("slow", function () {
                            $('#right-area').html(response).fadeIn();
                        });
                    })

            // Все Комплектации модели для калькулятора
            $.get(this.pathTempl + 'ajax-compl.php', {modelCode: modelCode, brandName: $('select.js-brand option:selected').text()})
                    .done(function (response) {
                        $('.js-compl').html(response);
                        $this.select_first_complect();
                
                    })

            // Комплектации модели в блок РАСЧЕТ ПЛАТЕЖА
            $.get(this.pathTempl + 'ajax-compl-payment.php', {modelCode: modelCode, brandCode: brandCode, brandName: $('select.js-brand option:selected').text()})
                    .done(function (response) {
                        $('.js-payment').html('').fadeOut("slow", function () {
                            $('.js-payment').html(response).fadeIn();
                        });
                    })
           if (type !='') {$('#credit-type option[data-code="'+type+'"]').prop('selected', true);}         

        } else if (!!arrUri[4]) {

            let brandCode = arrUri[4];

            // Все модели по бренду для калькулятора
            $.get(this.pathTempl + 'ajax-model.php', {brandCode: brandCode})
                    .done(function (response) {
                        $('.js-model').html(response);
                    })

            // Рандомные модели по бренду в блок РАСЧЕТ ПЛАТЕЖА
            $.get(this.pathTempl + 'ajax-model-payment.php', {brandCode: brandCode})
                    .done(function (response) {
                        $('.js-payment').html('').fadeOut("slow", function () {
                            $('.js-payment').html(response).fadeIn();
                        });
                    })

        } else {
            // Рандомные модели всех брендов в блок РАСЧЕТ ПЛАТЕЖА
            $.get(this.pathTempl + 'ajax-model-payment.php', {brandRandom: 'rand'})
                    .done(function (response) {
                        $('.js-payment').html('').fadeOut("slow", function () {
                            $('.js-payment').html(response).fadeIn();
                        });
                    })
        }
    }

    //====================================================================================================================
    // выбор первой комлектации
    window.JSRsmCalc.prototype.select_first_complect = function () {
        var opt = $('.js-compl').find('option:not([disabled]):first');
        var v = opt.val();
        console.log(opt, v);
        $('.js-compl').val(v).change();
    }



    //====================================================================================================================
    // другие обработчики
    window.JSRsmCalc.prototype.clearResultFields = function () {
     
        $('.js-price, .js-pay-month, .js-vznos, js-price-discount ').text(0);
        $('.js-compl').html('<option disabled selected>Комплектация</option>');
        
    }

    //====================================================================================================================
    // другие обработчики
    window.JSRsmCalc.prototype.initOtherHandlers = function () {

        $this = this;

        //бранд
        $('.js-brand').change(function (event) {
            $.get($this.pathTempl + 'ajax-model.php', {brandId: $(this).val()})
                    .done(function (response) {
                        $('.js-model').html(response);
                    })
                    .fail(function (response) {
                        alert('Ошибка запроса. Попробуйте позже.');
                    })

            // Очищаем поля
            $this.clearResultFields();
            
            //фото - по умолчанию
            $('#right-area').html('').fadeOut(300, function () {
                $('#right-area').html('<img src="' + $this.pathTempl + 'img/auto.jpg">').fadeIn();
            });

            // Рандомные модели по бренду
            $.get($this.pathTempl + 'ajax-model-payment.php', {brandId: $(this).val(), brandName: $('select.js-brand option:selected').text()})
                    .done(function (response) {
                        $('.js-payment').html('').fadeOut("slow", function () {
                            $('.js-payment').html(response).fadeIn();
                        });
                    })

            $this.calc();
        });


        //Модель
        $('.js-model').change(function (event) {
            // Комплектации для модели
            $.get($this.pathTempl + 'ajax-compl.php', {modelId: $(this).val(), brandName: $('select.js-brand option:selected').text()})
                    .done(function (response) {
                        $('.js-compl').html(response);
                        $this.select_first_complect();
                    })
                    .fail(function (response) {
                        alert('Ошибка запроса. Попробуйте позже.');
                    })
                    
            // Очищаем поля
            $this.clearResultFields();                    

            // Выбираем фото модели
            $.get($this.pathTempl + 'car_img.php', {modelId: $(this).val()})
                    .done(function (response) {
                        $('#right-area').html('').fadeOut(300, function () {
                            $('#right-area').html(response).fadeIn();
                        });
                    })
                    .fail(function (response) {
                        alert('Ошибка запроса. Попробуйте позже.');
                    })


            // Комплектации модели в блок РАСЧЕТ ПЛАТЕЖА
            $.get($this.pathTempl + 'ajax-compl-payment.php', {modelId: $(this).val(), brandName: $('select.js-brand option:selected').text()})
                    .done(function (response) {
                        $('.js-payment').html('').fadeOut("slow", function () {
                            $('.js-payment').html(response).fadeIn();
                        });
                    })
                    
            $this.calc();
                    
        });

        //Комплектация
        $('.js-compl').change(function (event) {
            //var price = $(this).find('option:selected').data('price');
            //$('.js-price').text($this.formatter.format(price));
            $this.calc();
        });

        //Программа кредитования
        $('#credit-type').on('change', function () {
            $this.calc();
            return false;
        });

        // Изменение взноса --> у слайдера
        // Изменение срока кредита --> у слайдера

    }




    //====================================================================================================================
    // попытка калькуляции
    window.JSRsmCalc.prototype.calc = function () {
        
        console.log('calc func');
        //изначально панель результатов запрещена
        $('.calc_second_block_overlay').removeClass('hidden');
        //блок с ценами скрыт
        $('.calc_car_info_price').addClass('hidden');
        //$('.credit-calc__percent-number').html('');
        
        
        var brand = $('.js-brand').find('option:selected').text();
        //console.log('brand = '+brand);
        var base_prog = $('#credit-type').find('option[data-code="marka"]');
        var base_prog_name;
        if (base_prog.data('percent')>0)
            base_prog_name = brand + '*Finance (скидка: '+base_prog.data('percent')+ '%, ставка: '+base_prog.data('stavka') + '%* )';
        else 
            base_prog_name = brand + '*Finance (ставка: '+base_prog.data('stavka') + '%* )';
        base_prog.html( base_prog_name );  
        //console.log($('#credit-type').find('option[data-code="marka"]'));
        
        var price = $('.js-compl').find('option:selected').data('price');
        //если выбрана комплектация
        if (price) {
            
            var oldprice = $('.js-compl').find('option:selected').data('oldprice');
            
            $('.calc_second_block_overlay').addClass('hidden');
            
            $('.calc_car_info_price .cci_price').html($this.formatter.format(price) + ' руб');            
            $('.calc_car_info_price .cci_price_old').html($this.formatter.format(oldprice)  + ' руб');
            $('.calc_car_info_price').removeClass('hidden');

            
            var instVznos = this.inst.jsRsmVznos.data("ionRangeSlider");
            var vznos_prc =  instVznos.old_from; // Первоначальный взнос в %
            
            var instTime = this.inst.jsRsmTime.data("ionRangeSlider");
            var durat =  instTime.old_from * 6 + 6; // Длительность в мес
            
            
            var inst_program_credit = $('#credit-type').find('option:selected');
            var stavka = inst_program_credit.data('stavka');
            var discount = inst_program_credit.data('percent') * price / 100; // размер скидки (сразу перевод в руб)

            var vznos_val = vznos_prc * price / 100;
            
            
            // Прайс со скидкой
            var discPrice = (price - discount);
            //сумма на которую берется кредит (т.е. цена без первоначального взноса c учетом скидки)
            var diff = discPrice - vznos_val;
            
            //упрощенное определение переплаты
            //процентная сумма переплаты по ставке за год
            var year_sum_by_prc = Math.ceil((discPrice / 100) * stavka);
            //суммарная сумма переплаты по ставке за срок кредита
            var total_sum_by_prc =  year_sum_by_prc * durat / 12 ;

            // Общая сумма кредита с переплатой
            var total_sum = Math.ceil(diff + total_sum_by_prc);

            // Ежемесячный платеж
            var pay_month = Math.ceil(total_sum / durat); 

            console.log('vznos=' + vznos_prc + ', srok=' + durat + ', stavka='+stavka + ', total='+total_sum);

            //блок результатов
            $('#program_credit').html(inst_program_credit.text());
            $('#monthpay_credit').html( $this.formatter.format(pay_month)  + ' руб. **' );
            $('#start_vznos').html( $this.formatter.format(vznos_val)  + ' руб.' );
            $('#srok_credita').html( durat + ' мес.');
            $('#stavka_credita').html(stavka+'% *');
            //$('.credit-calc__percent-number').html(stavka+'%');

            //данные форме заявки
            //ставка
            $("#js-new-percent").val(stavka);
            // сумма кредита
            $('#js-new-sum').val(total_sum);
            // цена машины
            $('#js-new-credit').val($this.formatter.format(price));
            // ежемесячный платеж
            $('#js-new-month').val($this.formatter.format(pay_month));
            // Прайс со скидкой
            $('.js-price-discount').text($this.formatter.format(discPrice));


            //блок преимущества
            var program_id = inst_program_credit.data('id');
            if ( this.arRsmPrograms.hasOwnProperty( program_id  ) ) {
                console.log ( 'program = ', this.arRsmPrograms[program_id] );
                $('.rsm_preimushestva .require-block__list').remove();
                if (this.arRsmPrograms[program_id].PREVILEGIES.length>0) {
                    $('.rsm_preimushestva').append( this.arRsmPrograms[program_id].PREVILEGIES );
                } else {
                    $('.rsm_preimushestva').append( this.default_PREVILEGIES );
                }
            }

        } else {
            var price = 0;
        }        
    }










    //~~~~~~~~~~~~~~~~~~~~~~
    //отправка по ajax, и выполнение функции по завершению (параметры - полученные данные)
    window.JSRsmCalc.prototype.send_ajax = function (data, callback, url) {
        console.log('send_ajax: ' + data.action);
        url = url || this.ajax_path;
        this.showLoader();
        var $this = this;
        $.ajax({
            url: url,
            type: 'post',
            dataType: 'json',
            data: data,
            success: function (data) {
                $this.hideLoader();
                if (data.IS_OK == 'Y') {
                    callback(data);
                } else {
                    $this.ErrorHandler('ошибка: ' + data.msg);
                }
            },
            error: function () {
                $this.hideLoader();
                $this.ErrorHandler('send_ajax error, action=' + data.action);
            },
            complete: function () {
                $this.hideLoader();
            }
        });
    }


    //~~~~~~~~~~~~~~~~~~~~~~
    //показ изображения ajax-работы
    window.JSRsmCalc.prototype.showLoader = function () {
        //$('.ajax_loader').show();
    }
    //скрытие изображения ajax-работы
    window.JSRsmCalc.prototype.hideLoader = function () {
        //$('.ajax_loader').hide();
    }

    //~~~~~~~~~~~~~~~~~~~~~~
    window.JSRsmCalc.prototype.ErrorHandler = function (msg) {
        msg = typeof msg != 'undefined' ? msg : 'Error, all works stoped';
        console.log(msg, 'error');
        this.fancyMessage(msg, function () {});
        //alert(msg);
        //location.href = location.href;
    }


})(window);

/* End */
;; /* /local/components/auto.2019/rsm-calc-credit/templates/.default/script.js?167412645320932*/
