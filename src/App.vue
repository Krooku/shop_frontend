<template>
  <div>
    <Navigation ref="navigation" />
    <router-view class="content-view" />
    <div class="test" />
    <footer>STOPKA</footer>
  </div>
</template>

<script>
import api from './api'
import Navigation from './components/Navigation'

export default {
  components: {
    Navigation
  },
  data () {
    return {
      appName: process.env.VUE_APP_NAME || 'Saritagun',
      mobileMenu: false
    }
  },
  computed: {
    userLoaded () { return this.$store.getters.userLoaded },
    loggedIn () { return this.$store.getters.loggedIn },
    username () { return this.loggedIn && this.$store.getters.username },
    getRole () { return this.$store.getters.role }
  },
  methods: {
    async logout () {
      const response = await api.logout()
      if (response.status === 200) {
        this.$store.dispatch('logout')
        this.$router.push({ name: 'login' })
      }
    }
  }
}
</script>

<style lang="scss">

body, html {
  margin: 0;
  width: 100%;
  max-width: 100%;
  padding: 0;
  font-family: 'Roboto', sans-serif;
  // overflow-x: hidden;
  box-sizing: content-box;
}

a {
  text-decoration: none;
  color: black;
}

.hidden {
  display: none;
}

.video-wrapper {
  position: fixed;
  width: 100%;
  height: 100vh;
  z-index: -11;
  top: 0;
  right: 0;
  // touch-action: none;
  // user-select: none;
  transition: transform 0.2s ease-in-out;
}
.bg-video {
  height: 100vh;
  width: 177.77777778vh;
  min-width: 100%;
  min-height: 56.25vw;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

}

.test {
  height: 100vh;
}
</style>
