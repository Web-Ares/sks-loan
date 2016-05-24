$(function(){

    $('.swiper-container').each(function () {
        Slider($(this));
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
