<template>
  <div class="index">
    <div class="tip">项目开始前先确定UI规范</div>
    <div class="color--primary color">
      <div class="color__label">主色</div>
      <div class="color__value">#1EA9DA</div>
    </div>
    <div class="color--border color">
      <div class="color__label">边框 </div>
      <div class="color__value">#e9eaec</div>
    </div>

    <div class="color--title color">
      <div class="color__label">标题 </div>
      <div class="color__value">#262626</div>
    </div>
    <div class="color--sub color">
      <div class="color__label">次标题 </div>
      <div class="color__value">#8c8c8c</div>
    </div>
    <div class="color--content color">
      <div class="color__label">正文 </div>
      <div class="color__value">#595959</div>
    </div>
    <div class="color--disable color">
      <div class="color__label">失效 </div>
      <div class="color__value">#bbbec4</div>
    </div>

  </div>
</template>
<script>
export default {
  data() {
    return {
      colors: []
    }
  }
}
</script>
<style lang="less" scoped>
@import url('~@/style/variables.less');
@import url('~@/style/mixin.less');
.index {
  display: flex;
  flex-direction: column;
  align-items: center;
  .tip {
    color: @title-color;
    font-size: @title-font;
  }
  .color {
    width: 6rem;
    height: 1.5rem;
    margin-top: 0.2rem;
    border-radius: 4px;
    font-size: @content-font;
    &__label {
      color: #fff;
      padding: 0.2rem;
    }
    &__value {
      color: #fff;
      padding-left: 0.2rem;
      font-size: @subcontent-font;
    }
  }
  .color--primary {
    background: @primary-color;
  }
  .color--bg {
    background: @bg-color;
  }
  .color--border {
    background: @border-color;
  }
  .color--title {
    background: @title-color;
  }
  .color--sub {
    background: @sub-color;
  }
  .color--content {
    background: @content-color;
  }
  .color--disable {
    background: @disable-color;
  }
}
</style>
