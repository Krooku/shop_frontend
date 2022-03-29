<template>
  <div class="nav">
    <div>
      <div class="double">
        <vue-slider v-model="value_2" />
      </div>
      <div class="flex_box">
        <span
          style="margin-right: 4px;"
          v-text="'Cena od'"
        />
        {{ value_2[0] }}
        <span
          style="margin: 0 4px;"
          v-text="'PLN do'"
        />

        {{ value_2[1] }}
        <span
          style="margin-left: 4px;"
          v-text="'PLN'"
        />
      </div>
    </div>
    <!-- search bar -->
    <!-- sort by price dec asc,  -->
    <!-- color -->
    <!--  -->
  </div>
</template>
<script>
import VueSlider from 'vue-slider-component'
// default theme
import 'vue-slider-component/theme/default.css'

// material theme
// import 'vue-slider-component/theme/material.css'

// antd theme
// import 'vue-slider-component/theme/antd.css'

export default {
  components: {
    VueSlider
  },
  props: {
  },
  data () {
    return {
      value_2: [0, 100],
      value: 0
    }
  },
  computed: {
  },
  mounted () {
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
.nav {
  padding: 50px 10px;
  .double {
      height: 30px;
      width: 250px;
  }
  .flex_box {
    display: flex;
  }

  span {
    font-weight: bold;
  }
}
</style>
