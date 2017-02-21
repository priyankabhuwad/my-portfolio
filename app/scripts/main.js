(function ($, youtubeVideoConfig, window) {
  /** *Globals */
  var TweenMax = TweenMax || window.TweenMax
  var TimelineMax = TimelineMax || window.TimelineMax
  var Power2 = Power2 || window.Power2
  var Bounce = Bounce || window.Bounce
  var Back = Back || window.Back
  var YT = YT || window.YT
  var ytplayerInstance
  var fullPageJsConfig = window.fullPageJsConfig
   /** Global declaration ends */

  $(document).ready(function () {
    var splitTextElem = $('.split-text')
    var sectionOverlayElem = $('.section-overlay')
    var pageSectionElem = $('.page-section')
    var fullPageJsContainerElem = $('#scroll-container')
    var imageMosaicContainerElem = $('.grid')
    var artGalleryThumbnailElem = $('.gallery-img')
    var lightBoxOverlayElem = $('.lightbox-overlay,.lightbox-container')
    var playCarVideoButtonElem = $('.play-car-video')
    var carVideCloseButtonElem = $('.car-video-close')
    var playMorphVideoButtonElem = $('.play-morph-video')
    var morphVideoCloseButtonElem = $('.morph-video-close')
    pageSectionElem.hide()

    splitTextElem.each(function (index, elem) {
      $(this).html($(this).html().replace(/./g, '<span>$&</span>').replace(/\s/g, ' '))
    })

    fullPageJsContainerElem.fullpage({
      anchors: fullPageJsConfig.anchors,
      menu: fullPageJsConfig.menuSelector,
      afterLoad: function (anchorLink, index) {
        fullPageJsConfig.afterLoadFn(anchorLink, index)
      },
      onLeave: function (index) {
        fullPageJsConfig.onLeaveFn(index)
      }
    })
        /** Splash page transitions***/

    sectionOverlayElem.click(function () {
      var thisElem = $(this)
      var tl = new TimelineMax()
      /* Add common timeline for making the section overlay to disappear */
      tl.add(createOverlayFlyoutTimeline(thisElem))
      /* Animation timeline for only the first work page */
      if (thisElem.data('index') === 1) {
        tl.add(createImageMosaicTimeline(), 3.25)
      } else if (thisElem.data('index') === 2) {
        tl.add(createCarVideoTimeline(), 3)
      } else if (thisElem.data('index') === 3) {
        tl.add(createPovertyTimeline(), 3)
      } else if (thisElem.data('index') === 4) {
        youtubeVideoConfig.getYoutubePlayerInstance(youtubeVideoConfig.videoNames.SYMPHONY_VIDEO).then(function (playerInstance) {
          playerInstance.playVideo()
        })
      } else if (thisElem.data('index') === 5) {
        tl.add(createMorphTimeline(), 3)
      } else if (thisElem.data('index') === 6) {
        $('.art-gallery-main').removeClass('hidden').slick()
      }
    })
    imageMosaicContainerElem.on('click', '.grid-item', function (event) {
      $('.lightbox-container').html('')
      var originalImg = $(this).find('img')
      originalImg.clone().appendTo($('.lightbox-container'))
      $('.lightbox-overlay,.lightbox-container').removeClass('hidden')

      /** Dynamic Height and width calculation for centering the lightbox */
    })
    artGalleryThumbnailElem.on('click', function (event) {
      $('.lightbox-container').html('')
      var originalImg = $(this).find('img')
      originalImg.clone().appendTo($('.lightbox-container'))
      $('.lightbox-overlay,.lightbox-container').removeClass('hidden')

      /** Dynamic Height and width calculation for centering the lightbox */
    })
    lightBoxOverlayElem.click(function () {
      $('.lightbox-overlay,.lightbox-container').addClass('hidden')
    })
    playCarVideoButtonElem.click(function () {
      $('.car-video-container').removeClass('hidden')
      youtubeVideoConfig.getYoutubePlayerInstance(youtubeVideoConfig.videoNames.HOTWHEELS_VIDEO).then(function (playerInstance) {
        playerInstance.playVideo()
      })
    })
    carVideCloseButtonElem.click(function () {
      $('.car-video-container').addClass('hidden')
      youtubeVideoConfig.getYoutubePlayerInstance(youtubeVideoConfig.videoNames.HOTWHEELS_VIDEO).then(function (playerInstance) {
        playerInstance.stopVideo()
      })
    })
    playMorphVideoButtonElem.click(function () {
      $('.morph-video-container').removeClass('hidden')
      youtubeVideoConfig.getYoutubePlayerInstance(youtubeVideoConfig.videoNames.MORPH_VIDEO).then(function (playerInstance) {
        playerInstance.playVideo()
      })
    })
    morphVideoCloseButtonElem.click(function () {
      $('.morph-video-container').addClass('hidden')
      youtubeVideoConfig.getYoutubePlayerInstance(youtubeVideoConfig.videoNames.MORPH_VIDEO).then(function (playerInstance) {
        playerInstance.stopVideo()
      })
    })
  })
  function createMorphTimeline () {
    var tl = new TimelineMax()
    tl.set($('.morph-player-container'), {opacity: 0})
    tl.to($('.morph-player-container'), 2, {ease: Power2.easeOut,
      css: {opacity: 1}})
    return tl
  }
  function createPovertyTimeline () {
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
  function createCarVideoTimeline () {
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

  function createOverlayFlyoutTimeline (thisElem) {
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
  function createImageMosaicTimeline () {
    var tl = new TimelineMax()
    tl.add('start-flyout', 1.25)
       .set('.grid', {visibility: 'visible'})
      .from('.center-image', 1, {ease: Back.easeOut.config(1.7), css: {opacity: 0, scaleX: 0, scaleY: 0}})
      .staggerFrom('.fly-top', 0.5, {ease: Back.easeOut.config(1.7), transform: 'translateY(-800px)'}, 0.5, 'start-flyout')
      .staggerFrom('.fly-bottom', 0.5, {ease: Back.easeOut.config(1.7), transform: 'translateY(1800px)'}, 0.5, 'start-flyout')
    return tl
  }
}
)(window.jQuery, window.youtubeVideoConfig, window)
