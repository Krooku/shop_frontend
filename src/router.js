import Vue from 'vue'
import Router from 'vue-router'
import store from './store/'
import api from './api'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,

  scrollBehavior () {
    return { x: 0, y: 0 }
  },
  routes: [
    {
      path: '/',
      name: 'homepage',
      meta: { adminNotRequired: true, loginNotRequired: true },
      component: () => import(/* webpackChunkName: "home" */ './views/Homepage.vue')
    },
    {
      path: '/login',
      name: 'login',
      meta: { adminNotRequired: true, loginNotRequired: true, blockIfLoggedIn: true },
      component: () => import(/* webpackChunkName: "login" */ './views/Login.vue')
    },
    {
      path: '/register',
      name: 'register',
      meta: { adminNotRequired: true, loginNotRequired: true, blockIfLoggedIn: false },
      component: () => import(/* webpackChunkName: "register" */ './views/Register.vue')
    },
    {
      path: '/products',
      name: 'products',
      meta: { adminNotRequired: true, loginNotRequired: true, blockIfLoggedIn: false },
      component: () => import(/* webpackChunkName: "products" */ './views/Products.vue')
    },
    {
      path: '/products/:name',
      name: 'product',
      meta: { adminNotRequired: true, loginNotRequired: true, blockIfLoggedIn: false },
      component: () => import(/* webpackChunkName: "product" */ './views/Product.vue')
    },
    {
      path: '/addProduct',
      name: 'addProduct',
      meta: { adminNotRequired: false, loginNotRequired: false, blockIfLoggedIn: false },
      component: () => import(/* webpackChunkName: "addProduct" */ './views/AddProduct.vue')
    },
    {
      path: '/cart',
      name: 'cart',
      meta: { adminNotRequired: true, loginNotRequired: false, blockIfLoggedIn: false },
      component: () => import(/* webpackChunkName: "cart" */ './views/Cart.vue')
    },
    {
      path: '/tp',
      name: 'tp',
      meta: { adminNotRequired: true, loginNotRequired: true, blockIfLoggedIn: false },
      component: () => import(/* webpackChunkName: "cart" */ './views/Transpol.vue')
    },
    {
      path: '/tp2',
      name: 'tp2',
      meta: { adminNotRequired: true, loginNotRequired: true, blockIfLoggedIn: false },
      component: () => import(/* webpackChunkName: "cart" */ './views/Transpol2.vue')
    }
  ]
})

router.beforeEach(async (to, from, next) => {
  if (!store.state.userLoaded) {
    const response = await api.getUser()
    if (response.status === 200) store.dispatch('login', response.data)
  }

  if (!store.getters.loggedIn) {
    if (to.matched.some(record => record.meta.loginNotRequired)) {
      return next()
    }

    return next('/login')
  } else if (to.matched.some(record => record.meta.blockIfLoggedIn)) {
    return next('/')
  } else if (store.getters.role !== 'admin') {
    if (to.matched.some(record => record.meta.adminNotRequired)) {
      return next()
    }
    return next('/')
  }

  next()
})

export default router
