<template>
  <section>
    <div class="ant-spin-dot ant-spin-dot-spin"><i></i><i></i><i></i><i></i></div>
  </section>
</template>

<script></script>

<style scoped lang="less">
@primary-color: #1ea9da;
.ant-spin-dot {
  position: relative;
  display: inline-block;
  font-size: 32px;
  width: 32px;
  height: 32px;
  background: transparent;
}
.ant-spin-dot-spin {
  transform: rotate(45deg);
  animation: antRotate 1.2s infinite linear;
}

.ant-spin-dot i {
  width: 14px;
  height: 14px;
  border-radius: 100%;
  background-color: @primary-color;
  transform: scale(0.75);
  display: block;
  position: absolute;
  opacity: 0.4;
  animation: antSpinMove 1s infinite linear alternate;
  transform-origin: 50% 50%;
  &:nth-child(1) {
    left: 0;
    top: 0;
  }
  &:nth-child(2) {
    right: 0;
    top: 0;
    animation-delay: 0.4s;
  }
  &:nth-child(3) {
    right: 0;
    bottom: 0;
    animation-delay: 0.8s;
  }
  &:nth-child(4) {
    left: 0;
    bottom: 0;
    animation-delay: 1.2s;
  }
}
@keyframes antSpinMove {
  to {
    opacity: 1;
  }
}
@keyframes antRotate {
  to {
    transform: rotate(405deg);
  }
}
</style>
