(function ($, youtubeVideoConfig, timelineConfig, window) {
  /** *Globals */
  var fullPageJsConfig = window.fullPageJsConfig
   /** Global declaration ends */

  $(document).ready(function () {
    var splitTextElem = $('.split-text')
    var sectionOverlayElem = $('.section-overlay')
    var pageSectionElem = $('.page-section')
    var fullPageJsContainerElem = $('#scroll-container')
    var artGalleryThumbnailElem = $('.gallery-img')
    var lightboxContainerElem = $('.lightbox-container')
    var lightBoxOverlayElem = $('.lightbox-overlay,.lightbox-container')
    var playCarVideoButtonElem = $('.play-car-video')
    var carVideoContainerElem = $('.car-video-container')
    var carVideoCloseButtonElem = $('.car-video-close')
    var playMorphVideoButtonElem = $('.play-morph-video')
    var morphVideoCloseButtonElem = $('.morph-video-close')
    var morphVideoContainerElem = $('.morph-video-container')
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
      var tl = timelineConfig.createSectionOverlayClickAnimation(thisElem)
    })
    artGalleryThumbnailElem.on('click', function (event) {
      lightboxContainerElem.html('')
      var originalImg = $(this).find('img')
      originalImg.clone().appendTo($('.lightbox-container'))
      lightBoxOverlayElem.removeClass('hidden')

      /** Dynamic Height and width calculation for centering the lightbox */
    })
    lightBoxOverlayElem.click(function () {
      lightBoxOverlayElem.addClass('hidden')
    })
    playCarVideoButtonElem.click(function () {
      carVideoContainerElem.removeClass('hidden')
      youtubeVideoConfig.getYoutubePlayerInstance(youtubeVideoConfig.videoNames.HOTWHEELS_VIDEO).then(function (playerInstance) {
        playerInstance.playVideo()
      })
    })
    carVideoCloseButtonElem.click(function () {
      carVideoContainerElem.addClass('hidden')
      youtubeVideoConfig.getYoutubePlayerInstance(youtubeVideoConfig.videoNames.HOTWHEELS_VIDEO).then(function (playerInstance) {
        playerInstance.stopVideo()
      })
    })
    playMorphVideoButtonElem.click(function () {
      morphVideoContainerElem.removeClass('hidden')
      youtubeVideoConfig.getYoutubePlayerInstance(youtubeVideoConfig.videoNames.MORPH_VIDEO).then(function (playerInstance) {
        playerInstance.playVideo()
      })
    })
    morphVideoCloseButtonElem.click(function () {
      morphVideoContainerElem.addClass('hidden')
      youtubeVideoConfig.getYoutubePlayerInstance(youtubeVideoConfig.videoNames.MORPH_VIDEO).then(function (playerInstance) {
        playerInstance.stopVideo()
      })
    })
  })
}
)(window.jQuery, window.youtubeVideoConfig, window.timelineConfig, window)
