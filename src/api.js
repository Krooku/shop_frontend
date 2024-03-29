import axios from 'axios'
// import app from './main'

const axiosInstance = axios.create({
  baseURL: process.env.VUE_APP_API_URL || `/api/`,
  withCredentials: true
})

export default {
  /**
   * @param {string} method
   * @param {string} resource
   * @param {object} [data]
   */
  async execute (method, resource, data) {
    // if (app) app.$Progress.start()

    const request = axiosInstance({
      method,
      url: resource,
      data,
      validateStatus: () => true
    })

    /* request.then(() => {
      if (app) app.$Progress.finish()
    }) */

    return request
  },

  /* AUTHENTICATION */
  /**
   * Creates new session
   * @param {object} data
   * @param {string} data.username
   * @param {string} data.password
   */
  login (data) {
    return this.execute('POST', `/login`, {
      username: data.username,
      password: data.password
    })
  },

  /** Destroys current session */
  logout () {
    return this.execute('POST', `/logout`)
  },

  /**
   * Creates new user account
   * @param {object} data
   * @param {string} data.username
   * @param {string} data.email
   * @param {string} data.password
   */
  register (data) {
    return this.execute('POST', `/register`, {
      username: data.username,
      email: data.email,
      password: data.password
    })
  },

  /** Gets current logged in user */
  getUser () {
    return this.execute('GET', `/user`)
  },

  /** Gets current logged in user */
  getCart () {
    return this.execute('GET', `/user/cart`)
  },

  /**
   * Updates logged in user
   * @param {object} data
   * @param {string} [data.currentPassword]
   * @param {string} [data.password]
   * @param {string} [data.username]
   * @param {string} [data.email]
   */
  updateUser (data) {
    return this.execute('PATCH', `/user`, data)
  },

  /**
   * Sends email with link to reset password
   * @param {string} email
   */
  sendPasswordResetEmail (email) {
    return this.execute('POST', `/user/sendReset`, { email })
  },

  /**
   * Resets user password
   * @param {object} data
   * @param {string} data.token
   * @param {string} data.password
   */
  resetPassword (data) {
    return this.execute('POST', `/user/resetPassword`, data)
  },

  /**
   * Add product to cart
   * @param {Number} skip
   */
  listProducts (skip) {
    return this.execute('GET', `/products/${skip}`)
  },

  /**
   * Add product to cart
   * @param {string} productId
   */
  addToCart (productId) {
    return this.execute('PATCH', `/user/addToCart/${productId}`)
  },
  /**
   * Add product to cart
   * @param {string} productId
   */
  removeProductsFromCart (productId) {
    return this.execute('PATCH', `/user/removeProductsFromCart/${productId}`)
  },

  /**
   * Add product to cart
   * @param {string} productId
   */
  removeFromCart (productId) {
    return this.execute('PATCH', `/user/removeFromCart/${productId}`)
  },

  addProduct (data) {
    return this.execute('POST', `/product`, data)
  }
}
