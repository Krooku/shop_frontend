<template>
  <div
    ref="view_template"
    class="view_container"
  >
    <slot />
  </div>
</template>

<script>
import { gsap } from 'gsap'

export default {
  data () {
    return {
      nav: this.$parent.$parent.$refs.navigation.$refs.nav
    }
  },
  computed: {
    currentRouteName () {
      return this.$route.name
    }
  },
  mounted () {
    if (this.currentRouteName === 'homepage') {
      gsap.set(this.nav, { x: 0, opacity: 0 })

      gsap.to(this.nav, { opacity: 1, duration: 0.5 })
    } else {
      gsap.set(this.nav, { x: '-100%', opacity: 1 })

      gsap.to(this.nav, { x: 0, duration: 0.5 })
    }
  },
  methods: {
    beforeRouteLeave (to, from) {
      return new Promise((resolve, reject) => {
        // if (from.path === this.$route.path) resolve()
        if (this.currentRouteName === 'homepage') {
          gsap.to(this.nav, { opacity: 0, duration: 0.5, onComplete: resolve })
        } else {
          gsap.to(this.nav, { x: '-400px', duration: 0.5, onComplete: resolve })
        }
      })
    }
  }
}
</script>

<style lang="scss">
.view_container {
  width: calc(100% - 300px);
  margin-left: auto;
}
</style>
