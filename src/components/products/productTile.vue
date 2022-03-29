<template>
  <div class="product">
    <router-link
      :to="{ name: 'product', params: {
               name: product.name
             },
             query: {
               name: product.name,
               description: product.description,
               price: product.price,
               imgs: product.img
             }
      }"
    >
      <div class="photo">
        <img
          ref="prodImg"
          alt="empty"
        >
        <transition>
          <i
            v-if="!loaded"
            class="icon fa-solid fa-gem"
          />
        </transition>
      </div>
    </router-link>
    <p class="name">
      {{ product.name }}
    </p>
    <p class="price">
      {{ product.price }} PLN
    </p>
    <p
      class="addIcon"
      @click="addToCart()"
    >
      dodaj
    </p>
  </div>
</template>
<script>
import api from '../../api'
import { gsap } from 'gsap'

export default {
  props: {
    product: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      error: null,
      loaded: false,
      serverUrl: 'http://localhost:3000' // 'https://saritagun.herokuapp.com'
    }
  },
  computed: {
    productImg () { return `${this.serverUrl}/${this.product.img[0]}` }// { return 'http://localhost:3000/' + this.product.img[0] }
  },
  mounted () {
    gsap.set(this.$refs.prodImg, { opacity: 0 })
    this.$refs.prodImg.src = this.productImg
    this.$refs.prodImg.alt = this.product.name
    this.$refs.prodImg.onload = () => {
      this.loaded = true
      gsap.to(this.$refs.prodImg, { opacity: 1, delay: 0.5, duration: 0.5, ease: 'easeInOut' })
      this.$emit('loaded')
    }
  },
  methods: {
    async addToCart () {
      const response = await api.addToCart(this.product._id)
      if (response.status !== 200) {
        console.log(response.data.message)
        return (this.error = response.data.message)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.product {
    position: relative;
    display: flex;
    flex-direction: column;
    // max-width: 400px;
    // min-width: 350px;
    min-height: 500px;
    align-items: center;
    .name {
      text-transform: uppercase;
      letter-spacing: 2px;
    }
    .photo {
      position: relative;
      width: 100%;
      height: 100%;
      max-width: 400px;
      min-width: 350px;

      .icon {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
      img {
          width: 100%;
          height: 100%;
          // position: absolute;
          top: 0;
          left: 0;
          // top: 50%;
          // left: 50%;
          // transform: translate(-50%, -50%);
          border-radius: 3px;
          object-fit: cover;
      }
    }
}

/* we will explain what these classes do next! */
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
