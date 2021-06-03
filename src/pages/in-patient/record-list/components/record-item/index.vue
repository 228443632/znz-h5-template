<!--
 * @Description:
 * @Author bianpengfei
 * @create 2021/5/30 15:43
 -->
<template>
  <div class="item">
    <div class="item__title">
      <span>2019年07月09日</span>
      <img src="@/assets/detail/H.png" />
    </div>
    <div class="item__content">
      <div class="item__content-lt">
        <div class="it__name">高血压</div>
        <div class="it__host-name">合肥第一人名医院</div>
      </div>
      <div class="item__content-rt">
        <van-icon name="arrow" color="#8c8c8c" size="0.26rem" />
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
    img {
      width: 0.32rem;
      height: 0.32rem;
    }
  }
  .item__content {
    padding: 0 0.3rem 0.3rem;
    display: flex;
    &-lt {
      flex: 1;
      .it__name {
        font-size: 0.28rem;
        color: @content-color;
        .flex-vertical-center(0.4rem);
      }
      .it__host-name {
        padding-top: 0.08rem;
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
