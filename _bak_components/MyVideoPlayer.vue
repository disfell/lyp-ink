<template>
  <video ref="videoPlayer" class="video-js vjs-fluid vjs-big-play-centered mb-10"></video>
</template>

<script>
    // "video.js": "^8.3.0"
import videojs from 'video.js';
import 'video.js/dist/video-js.css'

export default {
  name: 'VideoPlayer',
  props: {
    videoSrc: {
      type: String,
      default() {
        return "";
      }
    }
  },
  data() {
    return {
      player: null
    }
  },
  mounted() {
    this.player = videojs(this.$refs.videoPlayer, {
      autoplay: false,
      controls: true,
      responsive: true,
      sources: [
        {
          src: this.videoSrc,
          type: 'video/mp4'
        }
      ]
    }, () => {
      this.player.log('onPlayerReady', this);
    });
  },
  beforeDestroy() {
    if (this.player) {
      this.player.dispose();
    }
  }
}
</script>