<template>
  <view-template>
    <div
      v-if="loadWrapper"
      ref="videoWrapper"
      class="video-wrapper"
    />
    <div class="content_tile top_content">
      <h1 class="logo">
        LOGO
      </h1>
      <p class="motto">
        A kto umarł ten nie żyje i coś tam.
      </p>
    </div>
    <div class="content_tile middle_content">
      <p>test1</p>
      <p>test1</p>
      <p>test1</p>
      <p>test1</p>
      <p>test1</p>
      <p>test1</p>
      <p>test1</p>
      <p>test1</p>
      <p>test1</p>
    </div>
  </view-template>
</template>

<script>
// import api from '../api'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ViewTemplate from '../components/ViewTemplate'

gsap.registerPlugin(ScrollTrigger)
export default {
  // vuetify: new Vuetify(),
  name: 'Homepage',
  components: {
    ViewTemplate
  },
  data () {
    return {
      isVideoLoaded: false,
      video: null,
      loadContent: false,
      loadNav: false,
      loadWrapper: true,
      isActive: true,
      prevRoute: null
    }
  },
  async beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.prevRoute = from
    })
  },
  beforeRouteLeave (to, from, next) {
    gsap.to(this.$refs.videoWrapper, { opacity: 0, duration: 0.5 })
    this.$children[0].beforeRouteLeave(to, from).then(() => {
      next()
    })
    next(false)
  },
  computed: {
    getRole () {
      return this.$store.getters.role
    }
  },
  mounted () {
    this.startRendering()

    gsap.set(this.$refs.videoWrapper, { opacity: 0 })

    gsap.to(this.$refs.videoWrapper, { opacity: 1, duration: 0.5 })
  },
  methods: {
    startRendering () {
      this.video = document.createElement('video')
      this.video.src = require('../assets/bgvideo.mp4')
      this.video.loop = 'loop'
      this.video.muted = 'true'
      this.video.setAttribute('playsinline', 'playsinline')
      this.video.classList.add('bg-video')
      this.video.load()
      this.video.onloadeddata = () => {
        /* gsap.to('#logo', {
          duration: 1.7,
          opacity: 0,
          scale: 1.7,
          delay: 0.5,
          ease: 'easeInOut',
          onComplete: () => {
            this.isVideoLoaded = true
            this.loadNav = true
            // this.showNav()
            this.showCurtain()
          }
        }) */
        this.loadWrapper = true
        this.$refs.videoWrapper.append(this.video)
        this.video.play()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.content_tile {
  width: calc(100% - 300px);
  min-height: 100vh;
  margin-left: auto;
  z-index: 101;
}
.top_content {
  text-align: right;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  color: rgb(235, 225, 225);
  padding-right: 20vw;
  box-sizing: border-box;

  .logo {
    font-size: 64px;
  }

  .motto {
    font-size: 28px;
  }
}
.middle_content {
  text-align: right;
  position: relative;
}
</style>
