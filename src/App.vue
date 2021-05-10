<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
console.log(`http://${ENV_HOST}:${ENV_PORT}`)
</script>
<style lang="less">
#app {
  height: 100vh;
  background: #f7f7f7;
  position: relative;
  margin: 0 auto;
  overflow: auto;
  over-flow: auto; /* winphone8和android4+ */
  -webkit-overflow-scrolling: touch; /* ios5+ */
  max-width: @max-width;
  min-width: @min-width;
}
</style>
