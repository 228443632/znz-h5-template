<template>
  <div class="loading">
    <img v-if="loading" class="busymark" src="@/assets/img/loading.gif" />
    <div v-if="loading" class="tip">数据加载中</div>
    <div v-if="error && !loading" class="tip">{{ errorMsg }}</div>
    <div v-if="2 == error && !loading" class="login" @click="$emit('login-click')">登录注册</div>
  </div>
</template>

<script>
export default {
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    error: {
      type: Number, //0:没有错误 1:其他错误 2:未登录
      default: 0
    },
    errorMsg: {
      type: String,
      default: '发生错误了，请重新尝试'
    }
  }
}
</script>
<style lang="less" scoped>
@subcontent-font: 0.24rem;
@sub-color: #8c8c8c;
.loading {
  width: 100%;
  height: 0.8rem;
  font-size: @subcontent-font;
  color: @sub-color;
  z-index: 100;
  text-align: center;
  .busymark {
    margin: 0 auto;
    height: 0.5rem;
    width: 0.5rem;
  }
  .tip {
    margin-top: 0.3rem;
  }
  .login {
    width: 1.8rem;
    height: 0.6rem;
    margin: 0.6rem auto 0;
    border: 1px solid;
    border-radius: 4px;
    text-align: center;
    line-height: 0.6rem;
    color: rgba(30, 169, 217, 1);
  }
}
</style>
