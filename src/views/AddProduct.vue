<template>
  <div>
    <h1>Dodaj produkt</h1>
    <div class="product">
      <form
        method="post"
        @submit.prevent="addProduct"
      >
        <input
          v-model="product.name"
          type="text"
        >
        <input
          v-model="product.description"
          type="text"
        >
        <input
          v-model="product.price"
          type="number"
        >
        <label>File
          <input
            type="file"
            multiple
            @change="handleFileUpload($event)"
          >
        </label>
        <button type="submit">
          Dodaj
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import api from '../api'

export default {
  name: 'AddProducts',
  data () {
    return {
      product: {
        name: '',
        description: '',
        price: 0,
        productImage: null
      },
      error: null,
      products: null,
      FILE: null
    }
  },
  methods: {
    handleFileUpload (event) {
      this.FILE = event.target.files
    },
    async addProduct () {
      const formData = new FormData()
      for (const i of Object.keys(this.FILE)) {
        formData.append('productImage', this.FILE[i])
      }
      formData.append('name', this.product.name)
      formData.append('description', this.product.description)
      formData.append('price', this.product.price)

      const response = await api.addProduct(formData)
      if (response.status !== 200) {
        return (this.error = response.data.message)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.product {
    margin-left: 300px;
    display: flex;
    flex-direction: column;
}
</style>
