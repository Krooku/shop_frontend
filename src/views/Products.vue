<template>
  <view-template>
    <product-nav />
    <div
      ref="products_container"
      class="products"
      @scroll="handleScroll"
    >
      <product-tile
        v-for="product in products"
        :key="product._id"
        :product="product"
        @loaded="animation"
      />
    </div>
  </view-template>
</template>

<script>
import api from '../api'
import { gsap } from 'gsap'
import ProductTile from '../components/products/productTile'
import ViewTemplate from '../components/ViewTemplate'
import ProductNav from '../components/products/productNav'

export default {
  name: 'Products',
  components: { ProductTile, ViewTemplate, ProductNav },
  data () {
    return {
      error: null,
      products: [],
      prevProductsLength: 0,
      loaded: 0,
      loading: false
    }
  },
  async beforeRouteEnter (to, from, next) {
    const response = await api.listProducts(0)
    console.log(response.data)
    if (response.status !== 200) {
      return (this.error = response.data.message)
    }
    next(vm => {
      vm.products = response.data
      window.addEventListener('scroll', vm.handleScroll)
    })
    next()
  },
  beforeRouteLeave (to, from, next) {
    window.removeEventListener('scroll', this.handleScroll)
    gsap.fromTo('.product', { opacity: 1 }, { y: '+100px', opacity: 0, stagger: 0.03, duration: 0.1, ease: 'easeInOut' })
    this.$children[0].beforeRouteLeave(to, from).then(() => {
      next()
    })
    next(false)
  },
  methods: {
    animation () {
      this.loaded++
      if (this.loaded === this.products.length) {
        const elements = [...document.getElementsByClassName('product')].slice(-6)
        gsap.fromTo(elements, { y: '+=100', opacity: 0 }, { y: 0, opacity: 1, stagger: 0.2, duration: 0.7, ease: 'easeInOut' })
      }
    },
    async handleScroll (e) {
      if ((window.scrollY + window.outerHeight) >= this.$refs.products_container.clientHeight && !this.loading && this.prevProductsLength !== this.products.length) {
        this.prevProductsLength = this.products.length
        this.loading = true
        const response = await api.listProducts(this.products.length)
        if (response.status !== 200) {
          return (this.error = response.data.message)
        }
        response.data.forEach(el => this.products.push(el))
        this.loading = false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.products {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    gap: 23px;
}
</style>
