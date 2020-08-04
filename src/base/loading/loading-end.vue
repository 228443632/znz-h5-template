<template>
  <div class="wrapper">
    <div class="end" v-if="end">
      没有更多数据了
    </div>
    <div class="loading" v-if="loading">
      <img src="@/assets/img/loading.gif" />
      <span v-if="text" class="loading-text">正在加载中</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    end: false,
    loading: false,
    text: ''
  }
}
</script>
<style lang="less" scoped>
@import url('~@/style/variables.less');
@import url('~@/style/mixin.less');
.wrapper {
  width: 100%;
  .end {
    width: 100%;
    height: 0.8rem;
    line-height: 0.8rem;
    background-color: #fff;
    font-size: @subcontent-font;
    color: @sub-color;
    text-align: center;
  }
  .loading {
    width: 100%;
    height: 0.7rem;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      height: 0.4rem;
      width: 0.4rem;
      margin-right: 10px;
    }
    .loading-text {
      color: #8c8c8c;
      font-size: 12px;
    }
  }
}
</style>
