<template>
  <div
    :class="{ 'scroll-view': true, 'div--webkit--scrollbar': true, 'scroll-view--scrollbar-none': !showScrollBar }"
    :style="{ height: height }"
    ref="scrollViewRef"
  >
    <slot></slot>
  </div>
</template>

<script>
import { sync } from 'vuex-pathify'
import { uniqueKey } from '@/utils/common'

export default {
  name: 'scroll-view-simple',
  props: {
    height: {
      type: String,
      require: true
    },
    showScrollBar: {
      // 是否展示滚动条
      type: Boolean,
      default: false
    },
    enabledScrollListener: {
      // 是否开启滚动监听
      type: Boolean,
      default: true
    }
  },

  computed: {
    _routePosition: sync('app/routePosition')
  },

  activated() {
    const scrollTop = this._routePosition[this._key]?.y
    if (scrollTop) {
      this.setScrollTop(scrollTop)
    }
  },

  deactivated() {
    this._routePosition[this._key] = {
      x: 0,
      y: this.$refs.scrollViewRef?.scrollTop
    }
  },

  created() {
    this._key = `${this.$route.fullPath}||${uniqueKey()}_${Number(new Date()).toString()}`
  },

  mounted() {
    if (this.enabledScrollListener) {
      this.throttledScrollHandler = this.$throttle(this.handleScroll, 20)
      this.debounceScrollHandler = this.$debounce(this.deScrollToBottom, 300)
      this.$refs.scrollViewRef.addEventListener('scroll', this.throttledScrollHandler)
    }
  },

  methods: {
    handleScroll() {
      const scrollTop = this.$refs.scrollViewRef.scrollTop
      const windowHeight = this.$refs.scrollViewRef.clientHeight
      const scrollHeight = this.$refs.scrollViewRef.scrollHeight
      this.$emit('on-scroll', scrollTop)
      this.debounceScrollHandler(scrollTop, windowHeight, scrollHeight)
    },

    deScrollToBottom(scrollTop, windowHeight, scrollHeight) {
      if (scrollHeight - scrollTop - windowHeight < 35) {
        console.warn('发生变化，滚动条')
        this.$emit('on-scroll-to-bottom')
      }
    },

    setScrollTop(val) {
      console.log(val)
      this.$nextTick(() => {
        this.$refs.scrollViewRef.scrollTop = val
      })
    }
  },

  beforeDestroy() {
    this.$refs.scrollViewRef.removeEventListener('scroll', this.throttledScrollHandler)
  }
}
</script>

<style scoped lang="less">
.scroll-view {
  over-flow: auto; /* winphone8和android4+ */
  -webkit-overflow-scrolling: touch; /* ios5+ */
  overflow: auto;
  .ios-bounce-android;
  .div--webkit--scrollbar();
}
.scroll-view--scrollbar-none {
  &::-webkit-scrollbar {
    width: 0;
    height: 0;
    display: none;
    color: transparent;
  }
}
</style>
