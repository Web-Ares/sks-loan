$(function(){

    var sum = document.getElementById('make-sum'),
        week = document.getElementById('make-week'),
        moneyPay = document.getElementById('money-pay');

    noUiSlider.create(sum, {
        start: 3000,
        step: 100,
        range: {
            'min': 0,
            'max': 50000
        }
    });

    noUiSlider.create(week, {
        start: 6,
        step: 1,
        range: {
            'min': 5,
            'max': 18
        }
    });

    noUiSlider.create(moneyPay, {
        start: 60,
        step: 10,
        range: {
            'min': 60,
            'max': 3060
        }
    });

    var date = new Date();
    var options = {
        /* era: 'long',*/
        year: 'numeric',
        month: 'long',
        day: 'numeric'
        /*weekday: 'long',
         timezone: 'UTC',
         hour: 'numeric',
         minute: 'numeric',
         second: 'numeric'*/
    };
    $('#present-data').text(date.toLocaleString("ru", options));
    $('#now_date').val(date.toLocaleString("ru", options)); /*.innerHTML*/

    sum.noUiSlider.on('update', function( values, handle ) {
        $('.pay-sum').text(parseInt(values[handle])); /*.innerHTML*/
        $('#request-send-sum').val(parseInt(values[handle])); /*.innerHTML*/
    });
    week.noUiSlider.on('update', function( values, handle ) {
        $('.pay-week').text(parseInt(values[handle])); /*.innerHTML*/
        $('#weeks').val(parseInt(values[handle])); /*.innerHTML*/
        var today = new Date(),
            inWeek = new Date();
        inWeek.setDate(today.getDate()+7*parseInt(values[handle]));
        $('#end-data').text(inWeek.toLocaleString("ru", options) );
        $('#end_data').val(inWeek.toLocaleString("ru", options)); /*.innerHTML*/

    });
    moneyPay.noUiSlider.on('update', function( values, handle ) {
        $('#get-number').val(parseInt(values[handle])); /*.innerHTML*/
    });


    /* input.addEventListener('change', function(){
         keypressSlider.noUiSlider.set([null, this.value]);
     });*/

    $('.swiper-container').each(function () {
        Slider($(this));
    });

    $('.sites').each(function () {
        Sites($(this));
    });

    $('.popup').each(function(){
        new Popup($(this));
    });

    var menu = $(".site__header");

    $(window).scroll(function(){
        if ( $(this).scrollTop() > 190 && menu.hasClass("default") ){
            menu.fadeOut('0',function(){
                $(this).removeClass("default")
                    .addClass("fixed")
                    .fadeIn('0');
            });
        } else if($(this).scrollTop() <= 190 && menu.hasClass("fixed")) {
            menu.fadeOut('0',function(){
                $(this).removeClass("fixed")
                    .addClass("default")
                    .fadeIn('0');
            });
        }
    });

    $.each($('.map'), function () {

        var myMap;

        function init () {
            myMap = new ymaps.Map('map', {
                center: $('.map__item').eq(0).attr('data-coord').split(', '),
                zoom: 12
            });
            myMap.controls
                .add('zoomControl', { left: 5, bottom: 5 })
                .add('typeSelector')
                .add('searchControl', { top: 5, right: 100 })
                .add('mapTools', { left: 35, bottom: 5 });

            $.each($('.map__item'), function(i){
                var curElem = $(this);
                if (curElem.attr('data-coord')) {
                    var coord = curElem.attr('data-coord').split(', ');

                    myMap.geoObjects.add(new ymaps.Placemark(
                        [coord[0], coord[1]],
                        {   hintContent: "Описание",
                            balloonContentBody: curElem.find('a').text() }, {
                            iconLayout: 'default#image',
                            iconImageHref: curElem.attr('data-icon'),
                            iconImageSize: curElem.attr('data-icon-size').split(', '),
                            iconImageOffset: [-15, -25]
                        }
                    ));
                }
            });
        }
        ymaps.ready(init);

    });
} );

var Slider = function (obj) {

    //private properties
    var _self = this,
        _obj = obj;

    //private methods
    var _addEvents = function () {

        },
        _init = function () {
            _addEvents();
        };

    if (_obj.hasClass('container_wrap')) {
        var _slider = new Swiper(_obj, {
            nextButton: '.reviews__next',
            prevButton: '.reviews__prev',
            pagination: '.reviews__pagination',
            paginationClickable: true,
            loop: true,
            slidesPerView: 1

        });

    }

    //public properties

    //public methods

    _init();
};

var Popup = function (obj) {

    var _self = this,
        _popup = obj,
        _popupContent = _popup.find( '.popup__content' ),
        _btnShow = $( '.header__menu_pay' ),
        _btnClose = _popup.find( '.popup__close' ),
        _html = $( 'html' );

    var _addEvents = function () {

            _btnShow.on( {
                click: function(){
                    var curPopup = $( '.popup' );

                    _showPopup( curPopup );

                    return false;
                }
            } );

            _btnClose.on( {
                click: function() {
                    var curPopup = $( this ).parents( '.popup' );
                    _hidePopup( curPopup );
                    return false;
                }
            } );
            _popup.click( function() {
                var curPopup = _popup;
                if ( _self._noClosePopup ) {
                    _self._noClosePopup = false;
                    return false;
                }
                _hidePopup( curPopup );
            });
            _popupContent.on({
                click: function(event) {
                    event = event || window.event;
                    event.stopPropagation();
                }
            });
        },
        _build = function(){
            _self._noClosePopup = false;
        },
        _makePopupContent = function() {


        },
        _showPopup = function( curPopup ){
            _popup.addClass( 'popup_opened' );
            _popupContent.removeClass( 'active' );
            curPopup.addClass( 'active' );
        },
        _hidePopup = function(curPopup){
            curPopup.removeClass( 'popup_opened' );
            _popupContent.removeClass( 'active' );
            _html.css({
                "overflow": ""
            });
        },
        _init = function () {
            _makePopupContent();
            _build();
            _addEvents();
        };

    _init();
};

var Sites = function (obj) {
    //private properties
    var _self = this,
        _tail = obj.find($('.site__our-title')),
        _close = obj.find($('.sites__close')),
        _obj = obj;

    //private methods
    var _addEvents = function () {
            _tail.on({
                click: function () {
                    if (!_obj.hasClass('active')){
                        _obj.addClass('active');
                        //_tail.addClass('steel');
                    } else {
                        _obj.removeClass('active');
                        _tail.removeClass('steel');
                    }
                }
            })
            _close.on({
                click: function () {
                    _obj.removeClass('active');
                    _tail.removeClass('steel');
                }
            })
        },
        _init = function () {
            _addEvents();
        };

    //public properties

    //public methods

    _init();
};
