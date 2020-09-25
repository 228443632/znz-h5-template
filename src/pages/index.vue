<template>
  <div id="pages-index" style="height: 100vh; overflow: auto" v-scroll.self="callback">
    <button @click.stop="btnClick">点击</button>
  </div>
</template>

<script>
export default {
  mounted() {
  },

  methods: {

    callback(val) {
      console.log(val)
    },
    btnClick() {
      const mpParams = encodeURIComponent(
        JSON.stringify({
          code: '1001',
          path: 'pages/login/login',
          miniprogramType: 0
        })
      )
      window.postMessage(
        JSON.stringify({
          uri: `mp://?target=${mpParams}`
        })
      )
    }
  }
}
</script>
