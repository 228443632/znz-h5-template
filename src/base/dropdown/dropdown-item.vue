<template>
  <div class="dropdown-item">
    <div class="dropdown-item__selected" @click="changePopup">
      <slot name="title" v-if="$slots.title"></slot>
      <div v-else class="dropdown-item__title" :class="active ? 'active-title' : ''">
        <div class="selected__name button-animation--scale">
          {{ title }}
        </div>
        <div class="selected__icon icon iconfont ic-unfold" :class="showClass === 'show' ? 'up' : 'down'"></div>
      </div>
    </div>
    <div class="dropdown-item__content" :style="{ top: contentTop + 'px' }" v-show="showList">
      <div :class="['list', showClass]" ref="slotListRef" :style="{ transform: `translateY(-${translateY}rem)` }">
        <!--自定义下拉内容-->
        <slot></slot>
      </div>
      <!-- dropdown-mask -->
      <div :class="['dropdown-mask', showClass]" @click="closePopup" @touchmove.prevent></div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    /*标题*/
    title: {
      type: [Number, String],
      default: ''
    },
    translateY: {
      // 下拉距离动画距离
      type: Number,
      default: -2
    }
  },
  data() {
    return {
      showList: '',
      showClass: '',
      contentTop: 0 // 内容top
    }
  },

  computed: {
    active() {
      return this.$parent.active === this.title
    }
  },

  mounted() {
    this.$nextTick(() => {
      this.getElementData('.dropdown-item', data => {
        this.contentTop = data.bottom
      })
    })
  },

  methods: {
    changePopup() {
      if (this.showList) {
        this.closePopup()
      } else {
        this.openPopup()
      }
    },
    openPopup() {
      // this.$parent  -> dropdown-menu
      this.$parent.$emit('show', this.title)
      this.showList = true
      this.$nextTick(() => {
        this.getElementData('.dropdown-item', data => {
          this.contentTop = data.bottom
          this.showClass = 'show'
        })
      })
    },

    /**
     * 关闭popup
     * */
    closePopup() {
      this.showClass = ''
      // this.showList = false
      this.$parent.$emit('close', this.title)
      setTimeout(() => {
        this.showList = false
      }, 20)
    },
    close() {
      this.showClass = ''
      this.showList = false
    },
    getElementData(el, callback) {
      var data = document.querySelector(el).getBoundingClientRect()
      callback(data)
    }
  }
}
</script>
<style lang="less" scoped>
@uni-border-color: #c8c7cc;
@border-color: #f8f8f9;
.active-title {
  .selected__name,
  .ic-unfold {
    color: #1ca9d9 !important;
  }
}
.dropdown-item {
  user-select: none;
  position: relative;
  &__selected {
    position: relative;
    flex: 1;
    display: flex;
    align-items: center;
    background: #fff;
    height: 0.82rem;
    width: 100%;
    justify-content: center;
    .dropdown-item__title {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      box-sizing: border-box;
      .selected__name {
        font-size: 0.28rem;
        color: #9c9c9c;
        margin-right: 0.06rem;
      }
      .icon {
        font-size: 0.22rem;
      }
      .ic-unfold {
        height: 0.58rem;
        width: 0.22rem;
        position: relative;
        .flex-center;
        font-size: 0.22rem !important;
        color: #8c8c8c;
        &::after {
          content: '\e74a';
          position: absolute;
          width: 0.22rem;
          height: 0.14rem;
          left: 0;
          right: 0;
          top: 0;
          bottom: 0;
          margin: auto;
          .flex-center;
        }
      }
      .selected__icon {
        &.down {
          transition: transform 0.3s;
          transform: rotate(0);
          transform-origin: center center;
        }
        &.up {
          transition: transform 0.3s;
          transform: rotate(-180deg);
        }
      }
    }
  }
  &__content {
    position: fixed;
    left: 0;
    right: 0;
    overflow: hidden;
    top: 0;
    bottom: 0;
    z-index: 50;
    .list {
      overflow: auto; /* winphone8和android4+ */
      -webkit-overflow-scrolling: touch; /* ios5+ */
      overflow-y: auto;
      position: absolute;
      left: 0;
      right: 0;
      z-index: 50;
      background: #fff;
      transform: translateY(0);
      transition: transform 0.3s ease-out;
      &.show {
        transform: translateY(0) !important;
      }
      &__option {
        height: 0.88rem;
        line-height: 0.88rem;
        font-size: 0.3rem;
        padding-left: 0.5rem;
        display: flex;
        color: #262626;
        justify-content: space-between;
        &:not(:last-child) {
          border-bottom: 1px solid #e9eaec;
        }
      }
    }
    .dropdown-mask {
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      // transition: all 0.1s;
      z-index: 2;
      &.show {
        background: rgba(0, 0, 0, 0.3);
      }
    }
  }
}
.flex-center {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>

<style scoped lang="less">
@font-face {
  font-family: 'iconfont'; /* project id 1200321 */
  src: url('//at.alicdn.com/t/font_1200321_xxkpfj8h2h.eot');
  src: url('//at.alicdn.com/t/font_1200321_xxkpfj8h2h.eot?#iefix') format('embedded-opentype'),
    url('//at.alicdn.com/t/font_1200321_xxkpfj8h2h.woff2') format('woff2'),
    url('//at.alicdn.com/t/font_1200321_xxkpfj8h2h.woff') format('woff'),
    url('//at.alicdn.com/t/font_1200321_xxkpfj8h2h.ttf') format('truetype'),
    url('//at.alicdn.com/t/font_1200321_xxkpfj8h2h.svg#iconfont') format('svg');
}
.icon-unfold {
  content: '\e74a';
}
</style>
