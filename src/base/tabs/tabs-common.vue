<template>
  <div class="wrapper" ref="scrollWrapper">
    <ul class="content" ref="content">
      <li
        v-for="tab of tabsList"
        :key="tab.id"
        :class="['item', selected == tab.id ? 'item-select' : '']"
        @click="changeTab(tab.id)"
      >
        {{ tab.name }}
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  props: {
    selected: Number,
    tabsList: Array
  },
  computed: {},
  mounted() {},
  methods: {
    changeTab(id) {
      this.$emit('item-click', id)
    }
  }
}
</script>
<style lang="less" scoped>
@import url('~@/style/variables.less');
@import url('~@/style/mixin.less');
.wrapper {
  height: 0.6rem;
  overflow-y: hidden;

  .content {
    list-style: none;
    box-sizing: border-box;
    font-size: 0;
    overflow-x: auto; //设置x轴可滑动
    white-space: nowrap; //元素不换行
    -webkit-overflow-scrolling: touch; //该属性会使用隐藏滚动条失效
    height: 1rem;
    .item {
      min-width: 1.2rem;
      height: 0.58rem;
      line-height: 0.58rem;
      text-align: center;
      display: inline-block;
      position: relative;
      font-size: 0.34rem;
      border: 0.01rem solid #e7e7e7;
      margin-right: 0.2rem;
      padding: 0 0.1rem;
      border-radius: 0.06rem;
      color: #8c8c8c;
    }
    .item-select {
      color: #1ea9da !important;
      font-weight: 700;
      border: 0.01rem solid #1ea9da;
    }
    :first-child {
      margin-left: 0.3rem;
    }
  }
}
::-webkit-scrollbar {
  width: 0;
  height: 0;
  display: none;
  color: transparent;
}
</style>
