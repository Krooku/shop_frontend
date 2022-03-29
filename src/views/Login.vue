<template>
  <view-template id="login_site">
    <div id="logo">
      Saritagun
    </div>
    <div class="login">
      <form
        method="post"
        @submit.prevent="handleLogin"
      >
        <h1>LOGOWANIE</h1>
        <input
          v-model="user.username"
          type="text"
          placeholder="Nazwa użytkownika"
          required
        >
        <input
          v-model="user.password"
          type="password"
          placeholder="Hasło"
          required
        >
        <p
          v-if="error"
          class="message message--error"
        >
          {{ error }}
        </p>
        <button type="submit">
          Zaloguj się
        </button>
      </form>
    </div>
  </view-template>
</template>

<script>

import api from '../api'
import ViewTemplate from '../components/ViewTemplate'

export default {
  // vuetify: new Vuetify(),
  name: 'Homepage',
  components: {
    ViewTemplate
  },
  data () {
    return {
      error: null,
      user: {
        username: '',
        password: ''
      }
    }
  },
  beforeRouteLeave (to, from, next) {
    this.$children[0].beforeRouteLeave(to, from).then(() => {
      next()
    })
    next(false)
  },
  methods: {
    async handleLogin () {
      const response = await api.login(this.user)

      if (response.status !== 200) {
        return (this.error = response.data.message)
      }
      this.$store.dispatch('login', response.data)
      this.$router.push({ name: 'homepage' })
    }
  }
}
</script>
