<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>

    <!--页面不需要缓存-->
    <transition enter-active-class="animated fadeIn" appear mode="out-in">
      <router-view v-if="!$route.meta.keepAlive" />
    </transition>
  </div>
</template>
<style lang="less">
@import '~animate.css';
@import url('~@/style/variables.less');
@import url('~@/style/mixin.less');
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
