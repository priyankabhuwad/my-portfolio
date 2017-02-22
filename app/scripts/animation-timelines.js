window.timelineConfig = (function ($, TimelineMax, Power2, Back, Bounce, youtubeVideoConfig) {
  var splashSectionElemSelector = '#splash-section'
  var topBorderSelector = '.top-border'
  var leftBorderSelector = '.left-border'
  var tagLineTextSelector = '.tagline-text span'
  var meiImageSelector = '.center-img img'
  var videoImageSelector = '.video-img img'
  var catImageSelector = '.cat-img img'

  var createSplashAnimationLocal = function () {
    $(splashSectionElemSelector).show()
    var section1Timeline = new TimelineMax({ repeat: 0 })
    section1Timeline.add('start', 0.85).add('second', 1)
  .from($(splashSectionElemSelector), 0.75, { ease: Back.easeOut.config(1.7), css: { transform: 'translateX(-100vw)', opacity: 0.5 } })
  .from($('h1'), 1, { ease: Bounce.easeOut, scaleX: 0.1, scaleY: 0.1, opacity: 0 }, 'start')
  .staggerFromTo(tagLineTextSelector, 0.25, { opacity: 0, rotationX: -180, top: '-100px' }, { opacity: 1, rotationX: 0, top: '0px' }, 0.025)
  .from($(meiImageSelector), 0.25, { ease: Back.easeOut.config(1.7), scaleX: 0.1, scaleY: 0.1, opacity: 0 }, 'start')
  .from($(videoImageSelector), 0.25, { ease: Back.easeOut.config(1.7), transform: 'translateX(200px)', opacity: 0 }, 'second')
  .from($(catImageSelector), 0.25, { ease: Back.easeOut.config(1.7), transform: 'translateX(-200px)', opacity: 0 }, 'second')
    return section1Timeline
  }

  function createBorderTimeline (sectionElem) {
    var tl = new TimelineMax()
    tl.fromTo(sectionElem.find(leftBorderSelector), 1, { height: 0 }, { height: '100%' }, 'horizontal-border-start')
        .fromTo(sectionElem.find(topBorderSelector), 1, { width: 0 }, { width: '100%' }, 'vertical-border-start')
        .fromTo(sectionElem.find('.right-border'), 1, { height: 0 }, { height: '100%' }, 'horizontal-border-start')
        .fromTo(sectionElem.find('.bottom-border'), 1, { width: 0 }, { width: '100%' }, 'vertical-border-start')
    return tl
  }
  var createWorkPageAnimationLocal = function (index) {
    var section1Timeline = new TimelineMax({ repeat: 0 })
    var sectionElem = $('#work' + (index - 1) + '-section')
    sectionElem.find('.section-overlay').data('index', (index - 1))
    sectionElem.show()
    section1Timeline.add('vertical-border-start', 0.85).add('horizontal-border-start', 1)
        .from(sectionElem, 0.75, { ease: Back.easeOut.config(1.7), css: { transform: 'translateX(-1300px)', opacity: 0.5 } })
        .add(createBorderTimeline(sectionElem))
        .staggerFromTo(sectionElem.find('.section-overlay h3 span'), 3, { opacity: 0, rotationX: -180, top: '-100px' }, { opacity: 1, rotationX: 0, top: '0px' }, 0.025, 'vertical-border-start')
    return section1Timeline
  }
  var createOverlayFlyoutTimeline = function (thisElem) {
    var sectionDescriptionElem = thisElem.prev('.section-description-container')
    var coverImageElem = sectionDescriptionElem.siblings('.cover-img')
    var tl = new TimelineMax()
    tl.add('startLabel', 0.5)
      .set(thisElem, {opacity: 1})
      .to(coverImageElem, 0.5, {ease: Power2.easeOut, css: {borderRadius: '50%', scaleX: 0.01, scaleY: 0.01, opacity: 0}}, 'startLabel')
      .to(thisElem, 0.5, {ease: Power2.easeOut, css: {borderRadius: '50%', scaleX: 0.05, scaleY: 0.05, opacity: 0.3}}, 'startLabel')
      .to(thisElem, 0.5, {ease: Power2.easeOut, css: {transform: 'translateY(-100vh)', opacity: 0, scaleX: 0, scaleY: 0}})
      .set(sectionDescriptionElem, {display: 'block', transform: 'translateY(-100vh)'})
      .to(sectionDescriptionElem, 1, {ease: Power2.easeOut, css: {transform: 'translateY(0)'}})
    return tl
  }
  var createMorphTimeline = function () {
    var tl = new TimelineMax()
    tl.set($('.morph-player-container'), {opacity: 0})
    tl.to($('.morph-player-container'), 2, {ease: Power2.easeOut,
      css: {opacity: 1}})
    return tl
  }
  var createPovertyTimeline = function () {
    var tl = new TimelineMax()
    $('.poverty-carousel,.poverty-carousel-slider').removeClass('not-visible')
    $('.poverty-carousel').slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      fade: true,
      asNavFor: '.poverty-carousel-slider'})
    $('.poverty-carousel-slider').slick({
      slidesToShow: 3,
      slidesToScroll: 1,
      asNavFor: '.poverty-carousel',
      dots: false,
      arrows: false,
      centerMode: true,
      centerPadding: '40px',
      focusOnSelect: true
    })
    $(window).trigger('resize')
    tl.to($('.poverty-player-container'), 2, {ease: Power2.easeOut,
      css: {opacity: 1}})
    return tl
  }

  var createCarVideoTimeline = function () {
    var tl = new TimelineMax()
    $('.car-carousel,.car-carousel-slider').removeClass('not-visible')
    $('.car-carousel').slick(
      {
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        fade: true,
        asNavFor: '.car-carousel-slider'})
    $('.car-carousel-slider').slick({
      slidesToShow: 3,
      slidesToScroll: 1,
      asNavFor: '.car-carousel',
      dots: false,
      arrows: false,
      centerMode: true,
      centerPadding: '40px',
      focusOnSelect: true
    })
    $(window).trigger('resize')
    tl.to($('.player-container'), 2, {ease: Power2.easeOut,
      css: {opacity: 1}})
    return tl
  }
  var createSectionOverlayClickAnimationLocal = function (thisElem) {
    var tl = new TimelineMax()
    var index = thisElem.data('index')
      /* Add common timeline for making the section overlay to disappear */
    tl.add(createOverlayFlyoutTimeline(thisElem))
      /* Animation timeline for only the first work page */
    if (index === 1) {
      // tl.add(createImageMosaicTimeline(), 3.25)
    } else if (index === 2) {
      tl.add(createCarVideoTimeline(), 3)
    } else if (index === 3) {
      tl.add(createPovertyTimeline(), 3)
    } else if (index === 4) {
      youtubeVideoConfig.getYoutubePlayerInstance(youtubeVideoConfig.videoNames.SYMPHONY_VIDEO).then(function (playerInstance) {
        playerInstance.playVideo()
      })
    } else if (index === 5) {
      tl.add(createMorphTimeline(), 3)
    } else if (index === 6) {
      $('.art-gallery-main').removeClass('hidden').slick()
    }
    return tl
  }
  return {
    createSplashAnimation: createSplashAnimationLocal,
    createWorkPageAnimation: createWorkPageAnimationLocal,
    createSectionOverlayClickAnimation: createSectionOverlayClickAnimationLocal

  }
})(window.jQuery, window.TimelineMax, window.Power2, window.Back, window.Bounce, window.youtubeVideoConfig)
