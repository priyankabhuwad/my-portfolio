window.carouselConfig = (function ($) {
  var linkedCarouselMainConfig = {
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: true}
  var linkedCarouselSliderConfig = {
    slidesToShow: 3,
    slidesToScroll: 1,
    asNavFor: '.poverty-carousel',
    dots: false,
    arrows: false,
    centerMode: true,
    centerPadding: '40px',
    focusOnSelect: true
  }
  var carouselConfigNames = {
    HOTWHEELS_CAROUSEL: 'hotWheelsCarousel',
    POVERTY_CAROUSEL: 'povertyCarousel',
    ART_CAROUSEL: 'artCarousel'

  }
  var carouselConfigMap = {}
  var init = function () {
    carouselConfigMap[carouselConfigNames.HOTWHEELS_CAROUSEL] = {
      mainCarouselConfig: $.extend({}, linkedCarouselMainConfig, {asNavFor: '.car-carousel-slider'}),
      sliderCarouselConfig: $.extend({}, linkedCarouselSliderConfig, {asNavFor: '.car-carousel'})
    }
    carouselConfigMap[carouselConfigNames.POVERTY_CAROUSEL] = {
      mainCarouselConfig: $.extend({}, linkedCarouselMainConfig, {asNavFor: '.poverty-carousel-slider'}),
      sliderCarouselConfig: $.extend({}, linkedCarouselSliderConfig, {asNavFor: '.poverty-carousel'})
    }
    carouselConfigMap[carouselConfigNames.ART_CAROUSEL] = {
      mainCarouselConfig: $.extend({}, linkedCarouselMainConfig)
    }
  }
  init()
  var getCarouselConfigByNameLocal = function (name) {
    if (!name) {
      return
    }
    if (!carouselConfigMap[name]) {
      return
    }
    return carouselConfigMap[name]
  }
  return {
    carouselConfigNames: carouselConfigNames,
    getCarouselConfigByName: getCarouselConfigByNameLocal
  }
})(window.jQuery)

