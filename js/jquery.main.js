$(function(){

    $('.swiper-container').each(function () {
        Slider($(this));
    });

    $('.popup').each(function(){
        new Popup($(this));
    });

    var menu = $(".site__header");

    $(window).scroll(function(){
        if ( $(this).scrollTop() > 200 && menu.hasClass("default") ){
            menu.fadeOut('0',function(){
                $(this).removeClass("default")
                    .addClass("fixed")
                    .fadeIn('0');
            });
        } else if($(this).scrollTop() <= 200 && menu.hasClass("fixed")) {
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
                        {   hintContent: "CКС Ломбард",
                            balloonContentBody: curElem.find('a').text() }, {
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
        _btnShow = $( '.btn_3' ),
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
