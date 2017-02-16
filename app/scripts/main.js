(function ($, window) {
  /** *Globals */
  var TweenMax = TweenMax || window.TweenMax
  var TimelineMax = TimelineMax || window.TimelineMax
  var Power2 = Power2 || window.Power2
  var Bounce = Bounce || window.Bounce
  var Back = Back || window.Back
  var YT = YT || window.YT
  var ytplayerInstance
  var fullPageJsConfig = {
    anchors: ['firstPage', 'secondPage', '3rdPage', '4thPage', 'lastPage']
  }
   /** Global declaration ends */

  $(document).ready(function () {
    var splitTextElem = $('.split-text')
    var sectionOverlayElem = $('.section-overlay')
    var pageSectionElem = $('.page-section')
    var fullPageJsContainerElem = $('#scroll-container')
    var imageMosaicContainerElem = $('.grid')
    var lightBoxOverlayElem = $('.lightbox-overlay,.lightbox-container')
    var playCarVideoButtonElem = $('.play-car-video')
    pageSectionElem.hide()
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
    splitTextElem.each(function (index, elem) {
      $(this).html($(this).html().replace(/./g, '<span>$&</span>').replace(/\s/g, ' '))
    })
    var timelines = []
    fullPageJsContainerElem.fullpage({
      anchors: fullPageJsConfig.anchors,
      menu: '#menu',
      afterLoad: function (anchorLink, index) {
        console.log('Value of index' + index)
        if (timelines[index]) {
          if (index === 3) {
            if (ytplayerInstance) {
              ytplayerInstance.playVideo()
            }
          }
          return
        }
        if (index === 1) {
          createSplashAnimation()
        } else if (index > 1) {
          createWorkPageAnimation(index)
        }
        timelines[index] = true
      },
      onLeave: function (index) {
        if (index === 3) {
          if (ytplayerInstance) {
            ytplayerInstance.stopVideo()
          }
        }
        console.log('On leave called' + index)
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
        tl.add(createCarVideoTimeline(), 2)
        $(window).trigger('resize')
        ytplayerInstance = initialiseYoutubePlayer()
      }
    })
    imageMosaicContainerElem.on('click', '.grid-item', function (event) {
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
    })
  })
  function createCarVideoTimeline () {
    var tl = new TimelineMax()
    $('.car-carousel,.car-carousel-slider').removeClass('hidden')
    tl.to($('.player-container'), 2, {ease: Power2.easeOut,
      css: {opacity: 1}})
    return tl
  }
  function initialiseYoutubePlayer () {
    var player
    var onPlayerReady = function (event) {
      event.target.playVideo()
    }

    var onPlayerStateChange = function (event) {
        /** *kept for reference in case need to mainpulate playback of video */
        /** This will be initialise outside *//* var done = false */
      /* if (event.data == YT.PlayerState.PLAYING && !done) {
        setTimeout(stopVideo, 6000)
        done = true
      } function stopVideo () {
      player.stopVideo()
    } */
      console.log('Player ready state change do nothing')
    }

    player = new YT.Player('player', {
      height: '100%',
      width: '100%',
      videoId: '2M0S9VRRnak',
      playerVars: {playlist: '2M0S9VRRnak', 'autoplay': 0, 'controls': 0, 'loop': 1, 'disablekb': 1, 'showinfo': 0, 'autohide': 1, 'fs': 0, 'modestbranding': 1},
      events: {
        'onReady': onPlayerReady,
        'onStateChange': onPlayerStateChange
      }
    })
    return player
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
  function createSplashAnimation () {
    $('#splash-section').show()
    var section1Timeline = new TimelineMax({ repeat: 0 })
    section1Timeline.add('start', 0.85).add('second', 1)

        .from($('#splash-section'), 0.75, { ease: Back.easeOut.config(1.7), css: { transform: 'translateX(-100vw)', opacity: 0.5 } })
        .from($('h1'), 1, { ease: Bounce.easeOut, scaleX: 0.1, scaleY: 0.1, opacity: 0 }, 'start')
        .staggerFromTo('.tagline-text span', 0.25, { opacity: 0, rotationX: -180, top: '-100px' }, { opacity: 1, rotationX: 0, top: '0px' }, 0.025)
        .from($('.center-img img'), 0.25, { ease: Back.easeOut.config(1.7), scaleX: 0.1, scaleY: 0.1, opacity: 0 }, 'start')
        .from($('.video-img img'), 0.25, { ease: Back.easeOut.config(1.7), transform: 'translateX(200px)', opacity: 0 }, 'second')
        .from($('.cat-img img'), 0.25, { ease: Back.easeOut.config(1.7), transform: 'translateX(-200px)', opacity: 0 }, 'second')
    return section1Timeline
  }

  function createBorderTimeline (sectionElem) {
    var tl = new TimelineMax()
    tl.fromTo(sectionElem.find('.left-border'), 1, { height: 0 }, { height: '100%' }, 'horizontal-border-start')
        .fromTo(sectionElem.find('.top-border'), 1, { width: 0 }, { width: '100%' }, 'vertical-border-start')
        .fromTo(sectionElem.find('.right-border'), 1, { height: 0 }, { height: '100%' }, 'horizontal-border-start')
        .fromTo(sectionElem.find('.bottom-border'), 1, { width: 0 }, { width: '100%' }, 'vertical-border-start')
    return tl
  }

  function createWorkPageAnimation (index) {
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
}
)(window.jQuery, window)
