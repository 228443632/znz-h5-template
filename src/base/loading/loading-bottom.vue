<template>
  <div class="wrapper">
    <div class="end" v-if="end">
      没有更多数据了
    </div>
    <div class="loading" v-if="loading">
      <img src="@/assets/img/loading.gif" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    end: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    }
  }
}
</script>
<style lang="less" scoped>
@subcontent-font: 0.24rem;
@sub-color: #8c8c8c;
.wrapper {
  width: 100%;
  .end {
    width: 100%;
    height: 0.8rem;
    line-height: 0.8rem;
    font-size: @subcontent-font;
    color: @sub-color;
    text-align: center;
  }
  .loading {
    width: 100%;
    height: 0.6rem;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      height: 0.4rem;
      width: 0.4rem;
    }
  }
}
</style>
