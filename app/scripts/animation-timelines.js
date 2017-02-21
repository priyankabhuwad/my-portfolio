window.timelineConfig = (function ($, TimelineMax, Back, Bounce) {
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
  return {
    createSplashAnimation: createSplashAnimationLocal,
    createWorkPageAnimation: createWorkPageAnimationLocal

  }
})(window.jQuery, window.TimelineMax, window.Back, window.Bounce)
