<!--
 * @Description:
 * @Author bianpengfei
 * @create 2021/5/30 15:43
 -->
<template>
  <div class="item">
    <div class="item__title">
      <span>检查报告</span>
      <span></span>
    </div>
    <div class="item__content">
      <div class="item__content-lt">
        <div class="it__name">口腔 报告日期：2018/07/09</div>
        <div class="it__host-name">报告医生：张三 审核医生：蔡徐坤</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style scoped lang="less">
.item + .item {
  margin-top: 0.16rem;
}
.item {
  background: #fff;
  border-radius: 0.08rem;
  .click-active--opacity;
  padding: 0.08rem 0 0;
  .item__title {
    .flex-vertical-center(0.74rem);
    position: relative;
    font-size: 0.32rem;
    padding: 0 0.3rem;
    justify-content: space-between;
    color: @primary-color;
    &:before {
      content: '';
      position: absolute;
      left: 0;
      height: 0.32rem;
      width: 0.06rem;
      background: @success-color;
    }
  }
  .item__content {
    padding: 0 0.3rem 0.2rem;
    display: flex;
    &-lt {
      flex: 1;
      .it__name {
        font-size: 0.28rem;
        color: @content-color;
      }
      .it__host-name {
        font-size: 0.26rem;
        color: @sub-color;
      }
    }
    &-rt {
      width: 40px;
      flex-shrink: 0;
      display: flex;
      align-items: center;
      justify-content: flex-end;
    }
  }
}
</style>
