<template>
  <div
    ref="nav"
    class="nav_container"
    :style="{ width: activeWidth }"
  >
    <nav>
      <h1>LOGO</h1>
      <router-link
        to="/"
        class="nav_item"
        exact
      >
        <span class="hidden">Route to homepage</span>
        <i class="icon fa-solid fa-house" />
        <span class="title">Strona główna</span>
      </router-link>
      <router-link
        to="/products"
        class="nav_item"
      >
        <span class="hidden">Route to products</span>
        <i class="icon fa-solid fa-gem" />
        <span class="title">Produkty</span>
      </router-link>
      <router-link
        to="/contact"
        class="nav_item"
        exact
      >
        <span class="hidden">Route to contact</span>
        <i class="icon fa-solid fa-envelope" />
        <span class="title">Kontakt</span>
      </router-link>
      <router-link
        to="/wishlist"
        class="nav_item"
        exact
      >
        <span class="hidden">Route to wishlist</span>
        <i class="icon fa-solid fa-heart" />
        <span class="title">Lista życzeń</span>
      </router-link>
      <router-link
        to="/cart"
        class="nav_item"
        exact
      >
        <span class="hidden">Route to cart</span>
        <i class="icon fa-solid fa-cart-shopping" />
        <span class="title">Koszyk</span>
      </router-link>
      <span
        v-if="loggedIn"
        class="nav_item"
        exact
        @click="logout"
      >
        <i
          class="icon fa-solid fa-arrow-right-from-bracket"
        />
        <span class="title">Wyloguj</span>
      </span>
      <router-link
        v-else
        to="/login"
        class="nav_item"
        exact
      >
        <i
          class="icon fa-solid fa-arrow-right-to-bracket"
        />
        <span class="title">Zaloguj</span>
      </router-link>
    </nav>
    <!-- TODO: only if homepage active -->
    <div
      v-if="currentRouteName === 'homepage'"
      class="curtain"
    />
  </div>
</template>
<script>
import api from '../api'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default {
  data () {
    return {
      error: null,
      prevRoute: null,
      activeWidth: '100%'
    }
  },
  computed: {
    userLoaded () { return this.$store.getters.userLoaded },
    loggedIn () { return this.$store.getters.loggedIn },
    username () { return this.loggedIn && this.$store.getters.username },
    getRole () { return this.$store.getters.role },
    currentRouteName () {
      return this.$route.name
    }
  },
  watch: {
    currentRouteName (newValue, prevValue) {
      if (newValue === 'homepage') this.activeWidth = '100%'
      else if (prevValue === 'homepage') this.activeWidth = '240px'
    }
  },
  mounted () {
    if (this.currentRouteName !== 'homepage') this.activeWidth = '240px'
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

<style lang="scss" scoped>
.curtain {
    position: absolute;
    right: 0;
    top: 0;
    background: linear-gradient(90deg, rgba(238,174,202,0.8) 0%, rgba(148,187,233,0.8) 30%, rgba(148,187,233,0.8) 60%, rgba(238,174,202,0.8) 100%);
    width: calc(100% - 240px);
    height: 100vh;
    z-index: 0;
    transition: transform 0.2s ease-in-out;
}
.nav_container {
    position: fixed;
    height: 100vh;
    top:0;
    left: 0;
    z-index: 100;
    nav {
        position: relative;
        top: 0;
        left: 0;
        display: flex;
        flex-direction: column;
        justify-content: center;
        width: 240px;
        height: 100%;

        @media (max-height: 700px) {
            width: 100%;
            height: 100px;
            flex-direction: row;
        }
        .router-link-active,
        .router-link-exact-active {
          color: #f5d6f1 !important;
        }
        text-align: center;
        z-index: 0;

        .logo {
            color: white;
        }

        &:after {
            content: '';
            position: absolute;
            background: linear-gradient(90deg, rgba(238,174,202,0.8) 0%, rgba(148,187,233,0.8) 30%, rgba(148,187,233,0.8) 60%, rgba(238,174,202,0.8) 100%);
            top: 0;
            left: -50%;
            width: 150%;
            height: 100%;
            z-index: -1;
            transition: transform 0.2s ease-in-out;
        }
        .nav_item {
            position: relative;
            color: white;
            width: 100%;
            height: 60px;
            margin: 21px 0;
            &:hover {
                color: #f5d6f1;
                cursor: pointer;
            }
            .icon {
                font-size: 25px;
            }
            .title {
                // width: 100%;
                height: 100%;
                position: absolute;
                top: 0;
                left: 50%;
                transform: translate(-50%, 50%);
                transition: text-align, transform 0.2s ease-in-out;
            }
        }
    }

    nav:hover {
        .nav_item {
            .title {
                @media (min-height: 701px) {
                    transform: translate(35px, 8%);
                }
            }
        }

        &:after {
            transform: translate(25%, 0);
        }
    }

    nav:hover + .curtain {
        transform: translate(89.95px, 0);
    }
}

</style>
