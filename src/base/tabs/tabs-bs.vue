<!-- 只封装滚动逻辑,样式请根据需求直接修改-->
<template>
  <div class="wrapper" ref="scrollWrapper">
    <ul class="content" ref="content">
      <li
        class="item"
        :class="['item', selected == tab.id ? 'item--select' : '']"
        v-for="tab of tabsList"
        :key="tab.id"
        @click="changeTab(tab.id)"
      >
        <!-- <div v-bind:class="['item__year']">{{ tab.year }}</div> -->
        <div v-bind:class="['item__quarter']">Q{{ tab.name }}</div>
      </li>
    </ul>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
var scroll = null

export default {
  data() {
    return {
      contentWidth: 0,
      wrapperWidth: 0
    }
  },
  props: {
    tabsList: Array,
    selected: Number
  },
  watch: {
    selected() {
      this.$nextTick(() => {
        this.updateActiveLocation()
      })
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    changeTab(id) {
      this.$emit('item-click', id)
    },
    init() {
      const lis = this.$refs.content.children
      var contentWidth = 0
      this.tabsList.forEach((item, index) => {
        // console.log('index',index);
        // console.log('offsetWidth',lis[index].offsetWidth);

        contentWidth += lis[index].offsetWidth
      })
      this.$refs.content.style.width = contentWidth + 'px'

      console.log(`contentWidth ${contentWidth}`)
      scroll = new BScroll(this.$refs.scrollWrapper, {
        click: true,
        scrollX: true,
        // 忽略竖直方向的滚动
        scrollY: false,
        eventPassthrough: 'vertical'
      })

      console.log(`wrapper width ${this.$refs.scrollWrapper.offsetWidth}`)
      this.wrapperWidth = this.$refs.scrollWrapper.offsetWidth
      this.contentWidth = contentWidth
      this.updateActiveLocation()
    },
    updateActiveLocation() {
      var index = this.tabsList.findIndex(item => {
        return item.id == this.selected
      })
      var move_x = 0
      const lis = this.$refs.content.children
      // console.log('index', index)

      if (index >= 2) {
        for (var i = 0; i < index - 2; i++) {
          move_x += lis[i].offsetWidth
        }
      }
      console.log('move_x', move_x)
      console.log('this.contentWidth', this.contentWidth)
      console.log('this.wrapperWidth', this.wrapperWidth)

      // 如果content比wrapper还短则不滚动
      if (this.contentWidth <= this.wrapperWidth) {
        return
      }
      if (this.contentWidth - move_x < this.wrapperWidth) {
        // 避免选择最后几项时出现回弹
        scroll.scrollTo(this.wrapperWidth - this.contentWidth, 0, 300)
      } else {
        scroll.scrollTo(0 - move_x, 0, 400)
      }
    }
  }
}
</script>

<style lang="less" scoped>
@import url('~@/style/variables.less');
.wrapper {
  width: 100%;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  background-color: #fff;
  height: 1.4rem;
  overflow: hidden; //better-scroll滚动区域的wrapper需要定长并且overflow: hidden
  // white-space: nowrap; //元素不换行
  display: flex;
  align-items: center;
  .content {
    position: relative;
    font-size: 0.34rem;
    list-style: none; //去掉li上的小点
    display: flex;

    .item {
      padding-right: 0.2rem;
      width: 1.1rem;
      text-align: center;
      &__year {
        height: 0.33rem;
        line-height: 0.33rem;
        font-size: 0.24rem;
        color: @sub-color;
      }
      &__quarter {
        position: relative;
        height: 0.48rem;
        line-height: 0.48rem;
        font-size: 0.34rem;
        color: @title-color;
        &::after {
          content: '';
          width: 0;
          transition: width 0.2s;
        }
      }
    }
    .item--select {
      .item__quarter {
        &::after {
          content: '';
          position: absolute;
          bottom: -0.2rem;
          left: 50%;
          transform: translateX(-50%);
          width: 0.32rem;
          height: 0.08rem;
          background: @primary-color;
        }
      }
    }
    :last-child {
      padding-right: 0 !important;
    }
  }
}

::-webkit-scrollbar {
  width: 0;
  height: 0;
  color: transparent;
}
</style>
