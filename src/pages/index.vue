<template>
  <div id="pages-index" style="height: 100vh; overflow: auto">
    <van-button @click.stop="$router.push('/index/test')">跳转到test</van-button>
    <van-button type="primary" @click.stop="$router.push('/index/detail/1')">跳转到 详情页 2</van-button>

    <input />
  </div>
</template>

<script>
export default {
  name: 'index-test',
  mounted() {},

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
