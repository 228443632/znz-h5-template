<template>
  <div class="wrapper">
    <div class="end" v-if="end">没有更多数据啦~</div>
    <div class="loading" v-if="loading">
      <img src="@/assets/img/loading.gif" />
      <span v-if="text" class="loading-text">正在加载中</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'loading-end',
  props: {
    end: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    text: {
      type: [String, Number],
      default: ''
    }
  }
}
</script>
<style lang="less" scoped>
img {
  display: block;
}
.wrapper {
  width: 100%;
  height: 1rem;
  .flex-center;
  .end {
    width: 100%;
    height: 0.8rem;
    line-height: 0.8rem;
    font-size: 0.26rem;
    color: #8c8c8c;
    text-align: center;
  }
  .loading {
    width: 100%;
    height: 0.7rem;
    display: flex;
    justify-content: center;
    align-items: center;
    line-height: 0.7rem;
    img {
      height: 0.4rem;
      width: 0.4rem;
      margin-right: 10px;
    }
    .loading-text {
      color: #8c8c8c;
      font-size: 0.26rem;
    }
  }
}
</style>
