$(function(){

    $('.swiper-container').each(function () {
        Slider($(this));
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
