window.youtubeVideoConfig = (function ($, YT, Promise) {
  var defaultVideoVars = {
    'autoplay': 0,
    'controls': 0,
    'loop': 1,
    'disablekb': 1,
    'showinfo': 0,
    'autohide': 1,
    'fs': 0,
    'modestbranding': 1}
  var videoNamesLocal = {
    MORPH_VIDEO: 'MORPH_PLAYER',
    HOTWHEELS_VIDEO: 'HOTWHEELS_PLAYER',
    SYMPHONY_VIDEO: 'SYMPHONY_PLAYER'
  }
  var videoInstanceIds = {
    MORPH_PLAYER: {elementId: 'morphPlayer', videoId: '1bUMnLR3Ceg'},
    HOTWHEELS_PLAYER: {elementId: 'player', videoId: '2M0S9VRRnak'},
    SYMPHONY_PLAYER: {elementId: 'symphonyPlayer', videoId: 'l1sVD8kJQy8'}
  }
  var videoInstanceCollection = {
  }
  var init = function () {

  }
  var getYoutubePlayerInstanceLocal = function (element) {
    console.log('Inside youtube instance' + element)
    var promise
    promise = new Promise(function (resolve, reject) {
      var player
      try {
        if (videoInstanceCollection[element]) {
          resolve(videoInstanceCollection[element])
        } else {
          var onPlayerReady = function (event) {
            event.target.setVolume(0)
            event.target.playVideo()
            resolve(player)
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

          player = new YT.Player(videoInstanceIds[element].elementId, {
            height: '100%',
            width: '100%',
            videoId: videoInstanceIds[element].videoId,
            playerVars: $.extend(defaultVideoVars, {playlist: videoInstanceIds[element].videoId}),
            events: {
              'onReady': onPlayerReady,
              'onStateChange': onPlayerStateChange
            }
          })
        }
      } catch (e) {
        console.error('Error occurred')
        reject(e)
      }
    })

    return promise
  }

  return {
    videoNames: videoNamesLocal,
    getYoutubePlayerInstance: getYoutubePlayerInstanceLocal
  }
})(window.jQuery, window.YT, window.Promise)
