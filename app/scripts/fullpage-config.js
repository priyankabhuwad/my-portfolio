window.fullPageJsConfig = (function ($, timelineConfig, youtubeVideoConfig) {
  return {
    anchors: ['splash', 'enidblyton', 'car', 'poverty', 'symphony', 'morphing', 'paintings'],
    menuSelector: '#menu',
    timelines: [],
    afterLoadFn: function (anchorLink, index) {
      if (this.timelines[index]) {
        if (index === 3) {
          youtubeVideoConfig.getYoutubePlayerInstance(youtubeVideoConfig.videoNames.HOTWHEELS_VIDEO).then(function (playerInstance) {
            playerInstance.playVideo()
          })
        }
        return
      }
      if (index === 1) {
        timelineConfig.createSplashAnimation()
      } else if (index > 1) {
        timelineConfig.createWorkPageAnimation(index)
      }
      this.timelines[index] = true
    },
    onLeaveFn: function (index) {
      if (index === 3) {
        youtubeVideoConfig.getYoutubePlayerInstance(youtubeVideoConfig.videoNames.HOTWHEELS_VIDEO).then(function (playerInstance) {
          playerInstance.stopVideo()
        })
      }
    }
  }
})(window.jQuery, window.timelineConfig, window.youtubeVideoConfig)
