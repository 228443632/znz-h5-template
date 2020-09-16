<template>
  <div id="pages-index" style="height: 100vh; overflow: auto" v-scroll.self="callback">
    <div v-for="item in 1000" :key="item" style="line-height: 24px; font-size: 12px;">
      {{ item }}
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    callback(val) {
      console.log(val)
    }
  }
}
</script>
