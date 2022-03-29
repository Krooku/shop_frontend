<template>
  <view-template>
    <div class="top_content">
      <h1>LOGO</h1>
    </div>
    <div class="flex_box">
      <figure
        v-if="loaded"
        class="container"
      >
        <p
          v-for="(url, index) in product.imgs"
          :key="index"
          class="dot"
          :class="{ 'dot--active': dots[index] }"
          @click="moveTo(index)"
        >
          {{ index + 1 }}
        </p>
      </figure>
      <div
        v-if="loaded"
        class="img_container"
      >
        <img
          v-for="(url, index) in product.imgs"
          :id="'img' + index"
          :key="url"
          :src="productImg(url)"
          :alt="product.name"
          @load="trigger(index)"
        >
      </div>
      <figure class="content">
        <h1>{{ product.name }}</h1>
        <p>{{ product.description }} </p>
        <p>{{ product.price }}</p>
      </figure>
    </div>
  </view-template>
</template>

<script>
import ViewTemplate from '../components/ViewTemplate'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
gsap.registerPlugin(ScrollTrigger)
gsap.registerPlugin(ScrollToPlugin)

export default {
  components: { ViewTemplate },
  data () {
    return {
      error: null,
      product: {},
      loaded: false,
      dots: [],
      serverUrl: 'http://localhost:3000' // 'https://saritagun.herokuapp.com'
    }
  },
  methods: {
    moveTo (index) {
      gsap.to(window, { duration: 0.5, scrollTo: { y: `#img${index}`, offsetY: 100 }, ease: 'easeInOut' })
    },
    productImg (url) { return `${this.serverUrl}/${url}` },
    trigger (index) {
      ScrollTrigger.create({
        trigger: '#img' + index,
        start: `${(index === 0 ? 2 : 1) * -105}px top`,
        end: 'bottom 300px',
        onUpdate: (self) => {
          const array = Array.from({ length: this.dots.length }, (v, k) => { if (k === index) return true; else return false })
          this.dots = array
        }
      })
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      Object.assign(vm.product, to.query)
      if (!Array.isArray(vm.product.imgs)) {
        const arr = []
        arr.push(vm.product.imgs)
        delete vm.product.imgs
        vm.product.imgs = arr
        alert(vm.product.imgs.length)
      }
      for (let i = 0; i < vm.product.imgs.length; i++) vm.dots.push(false)
      vm.loaded = true
    })
  }
}
</script>

<style lang="scss" scoped>
.flex_box {
    display: flex;
    .img_container {
        display: flex;
        flex-direction: column;
        img {
            margin-bottom: 10px;
            width: 100%;
            height: 100%;
            max-width: 700px;
            max-height: 80vh;
            object-fit: cover;
        }
    }
    .container {
        top: 0;
        width: 30px;
        height: 100vh;

        .dot {
            color: black;
            font-size: 32px;
            &--active {
                color: green;
            }
        }
    }
    .content {
        top: 2px;
        height: 10rem;
        align-self: flex-start;
        justify-self: flex-start;
        margin-left: 5vw;
        padding-right: 30px;
        padding-top: 50px;
    }
    figure {
        display: flex;
        flex-direction: column;
        margin: 0;
        justify-content: center;
        position: sticky;
    }
}
</style>
