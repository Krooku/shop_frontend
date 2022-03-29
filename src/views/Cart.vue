<template>
  <view-template>
    <p v-if="cartArray.length === 0">
      Twój koszyk jest pusty
    </p>
    <animated-number
      :number="summary"
    />
    <transition-group
      tag="div"
      name="fade"
      class="container"
    >
      <div
        v-for="product in cartArray"
        :key="product.id"
        class="product"
      >
        <p>
          {{ product.product.name }}
          {{ product.product.price }}
          <span
            @click="removeProductsFromCart(product.id)"
          >
            usuń
          </span>
        </p>
        <div style="display:none;">
          <span
            class="char"
            @click="increase(product.id)"
          >+</span>
          {{ product.count }}
          <span
            class="char"
            @click="decrease(product.id)"
          >-</span>
          <p
            @click="removeProductsFromCart(product.id)"
          >
            usuń
          </p>
        </div>
      </div>
    </transition-group>
  </view-template>
</template>

<script>
import api from '../api'
import ViewTemplate from '../components/ViewTemplate'
import AnimatedNumber from '../components/AnimatedNumber'

export default {
  name: 'Cart',
  components: {
    ViewTemplate,
    AnimatedNumber
  },
  data () {
    return {
      error: null,
      cart: null,
      cartArray: [],
      summary: 0
    }
  },
  async beforeRouteEnter (to, from, next) {
    const response = await api.getCart()
    if (response.status !== 200) {
      return (this.error = response.data.message)
    }
    next(vm => {
      // create Map for lost duplicate and count these
      vm.cart = new Map()
      response.data.cart.forEach(el => {
        vm.summary += el.price
        if (vm.cart.has(el._id)) {
          vm.cart.get(el._id)[1]++
        } else {
          vm.cart.set(el._id, [ el, 1 ])
        }
      })
      // array is needed bcs vuejs for loop dosnt work with Map
      vm.cartArray = [...vm.cart].map(([id, [product, count]]) => ({ id, product, count }))
    })
    next()
  },
  beforeRouteLeave (to, from, next) {
    this.$children[0].beforeRouteLeave(to, from).then(() => {
      next()
    })
    next(false)
  },
  methods: {
    async removeProductsFromCart (productId) {
      const response = await api.removeProductsFromCart(productId)
      if (response.status !== 200) {
        return (this.error = response.data.message)
      }
      // here is dynamic delete for some product
      const index = this.cartArray.findIndex(element => {
        return element.id === productId
      })
      if (index > -1) {
        this.summary -= this.cartArray[index].product.price * this.cartArray[index].count
        this.cartArray.splice(index, 1)
      }
    },
    async increase (productId) {
      const response = await api.addToCart(productId)
      if (response.status !== 200) {
        return (this.error = response.data.message)
      }
      // here is dynamic delete for some product
      const index = this.cartArray.findIndex(element => {
        return element.id === productId
      })
      if (index > -1) {
        this.summary += this.cartArray[index].product.price
        this.cartArray[index].count++
      }
    },
    async decrease (productId) {
      const response = await api.removeFromCart(productId)
      if (response.status !== 200) {
        return (this.error = response.data.message)
      }
      // here is dynamic delete for some product
      const index = this.cartArray.findIndex(element => {
        return element.id === productId
      })
      if (index > -1) {
        this.summary -= this.cartArray[index].product.price
        if (this.cartArray[index].count - 1 === 0) this.cartArray.splice(index, 1)
        else this.cartArray[index].count--
      }
    }
  }
}
</script>

<style lang="scss" scoped>

.container {
    width: 100%;
    padding: 0;
    display: flex;
    flex-direction: column;
    height: 100%;
    // min-height: 100vh;
    // overflow: hidden;
    .product {
        font-size: 23px;
        width: 500px;
        height: 270px;
        background-color: #cae291;
        padding: 10px 21px;
        margin: 11px 0;
        color: #555555;
        box-sizing: border-box;
        div {
            display: flex;
        .char {
            padding: 0 5px;
            color: #555555;
            cursor: pointer;
            transition: color 0.5s ease-in-out;
            font-weight: bold;
            &:hover {
                color: green;
            }
        }
        }
    }
}

.fade-move,
.fade-enter-active,
.fade-leave-active {
  transition: all 0.4s cubic-bezier(0.55, 0, 0.1, 1);
}

/* 2. declare enter from and leave to state */
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translate(30px, 0);
}

/* 3. ensure leaving items are taken out of layout flow so that moving
      animations can be calculated correctly. */
.fade-leave-active {
  position: absolute;
}
</style>
