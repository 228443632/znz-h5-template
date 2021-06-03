<template>
  <div class="scroll-view-wrapper">
    <div
      class="scroll-view__body"
      ref="scrollViewRef"
      :style="_bodyStyle"
      @touchstart.stop.capture="onTouchStart"
      @touchmove.stop.capture="onTouchMove"
      @touchend.stop.capture="onTouchEnd"
    >
      <div class="scroll-view__header" ref="scrollViewHeaderRef" :style="_headerStyle" v-if="refreshEnabled">
        <div class="pull-header">
          <div class="pull-header-icon">
            <i :class="['iconfont', 'ic-arrow', move.state == 0 ? 'up' : 'down']" v-if="move.state < 2">&#xe7ee;</i>
            <div v-else-if="move.state == 2">
              <img src="@/assets/img/loading.gif" />
            </div>
          </div>
          <div class="pull-header-text">
            <span class="text-tip">
              <span v-if="move.state == 0">{{ pullingText }}</span>
              <span v-else-if="move.state == 1">{{ loosingText }}</span>
              <span v-else-if="move.state == 2">{{ loadingText }}</span>
              <span v-else-if="move.state == 3">{{ successText }}</span>
              <span v-else-if="move.state == 4">{{ failText }}</span>
            </span>
            <span class="text-date">{{ _currentDate }}</span>
          </div>
        </div>
      </div>
      <slot />
    </div>
  </div>
</template>

<script>
import { _formatDate } from '../utils/common'
import { Toast } from 'vant'
const cubic = value => Math.pow(value, 3)
const easeInOutCubic = value => (value < 0.5 ? cubic(value * 2) / 2 : 1 - cubic((1 - value) * 2) / 2)
export default {
  props: {
    el: {
      type: String,
      default: ''
    },
    height: {
      // scroll-view高度
      type: Number,
      default: '',
      required: 'true'
    },
    pullingText: {
      // 下拉过程提示文案
      type: String,
      default: '下拉即可刷新...'
    },
    loosingText: {
      //释放过程提示文案
      type: String,
      default: '释放立刻刷新...'
    },
    loadingText: {
      // 加载过程提示文案
      type: String,
      default: '正在刷新...'
    },
    successText: {
      // 刷新成功提示文案
      type: String,
      default: '刷新成功'
    },
    failText: {
      // 刷新成功提示文案
      type: String,
      default: '刷新失败'
    },
    refreshThreshold: {
      // 设置自定义下拉刷新阈值
      type: Number,
      default: 50
    },
    refreshEnabled: {
      // 是否禁用下拉刷新	  默认是false
      type: Boolean,
      default: true
    },
    bottomThreshold: {
      // 距底部 触发 on-scroll-to-lower 事件
      type: Number,
      default: 50
    },
    enabledScrollListener: {
      // 是否开启滚动监听
      type: Boolean,
      default: true
    },
    scrollTop: {
      // 设置竖向滚动条位置
      type: Number,
      default: 0
    },
    scrollWithAnimation: {
      // 在设置滚动条位置时使用动画过渡
      type: Boolean,
      default: true
    }
  },

  data() {
    return {
      startY: '', //保存touch时的Y坐标
      move: {
        distance: 0, //保存滑动的距离(绝对值)
        direction: '', // 移动方向  up往上  down往下
        state: 0, //开始滑动到结束后状态的变化 0:下拉即可刷新 1:释放即可刷新 2:加载中 3：刷新成功
        animationDuration: 0 //动画持续时间，0就是没有动画
      }
    }
  },

  watch: {
    'move.state'(a, b) {
      //我们监听move.state的状态，
      //0意味着开始也意味着结束，这里是结束，并且只有动画生效我们才能 move.distance 设为0，
      //为什么动画生效才行，因为动画生效意味着手指离开了屏幕，如果不懂去看touchEnd方法，这时
      //我们让距离变为0才会有动画效果。
      if (a == 0 && this.move.animationDuration === 300) {
        this.move.distance = 0
      } else if ([3, 4].includes(a)) {
        this.move.animationDuration = 300
        setTimeout(() => {
          this.move.distance = 0
          this.move.state = 0
        }, 1200)
      }
    },

    /**
     * 滚动条位置
     * */
    scrollTop(a, b) {
      console.warn('发生变化，滚动条')
      this.scrollToTop(a)
    }
  },

  computed: {
    _bodyStyle() {
      return {
        transition: `${this.move.animationDuration}ms`,
        transform: `translate3d(0,${this.move.distance}px, 0)`,
        height: `${this.height + this.refreshThreshold}px`,
        marginTop: `-${this.refreshThreshold}px`
      }
    },
    _headerStyle() {
      return {
        transition: `${this.move.animationDuration}ms`,
        height: `${this.refreshThreshold}px`
      }
    },

    _currentDate() {
      return `上次更新 ${_formatDate('MM-dd HH:mm')}`
    },

    _enablePull() {
      //首先判断我们有没有滚动条，如果有，我们下拉刷新就不能启用, 只有0:下拉即可刷新 1:释放即可刷新  才允许下拉
      return this.refreshEnabled && this.move.state != 2 && this.move.state != 3 && this.move.state != 4
    }
  },

  mounted() {
    if (this.enabledScrollListener) {
      this.throttledScrollHandler = this.$throttle(this.handleScroll, 300)
      this.debounceScrollHandler = this.$debounce(this.deScrollToBottom, 300)
      this.$refs.scrollViewRef.addEventListener('scroll', this.throttledScrollHandler)
    }
    this.$init()
  },

  methods: {
    $init() {},

    handleScroll() {
      var scrollTop = this.$refs.scrollViewRef.scrollTop
      var windowHeight = this.$refs.scrollViewRef.clientHeight
      var scrollHeight = this.$refs.scrollViewRef.scrollHeight
      this.$emit('on-scroll', scrollTop)
      this.debounceScrollHandler(scrollTop, windowHeight, scrollHeight)
    },

    deScrollToBottom(scrollTop, windowHeight, scrollHeight) {
      if (scrollHeight - scrollTop - windowHeight < this.bottomThreshold) {
        console.warn('发生变化，滚动条')
        this.$emit('on-scroll-to-bottom')
      }
    },

    /**
     * 滚动到指定位置
     * */
    scrollToTop(scrollTop = 0) {
      const el = this.$refs.scrollViewRef
      if (this.scrollWithAnimation) {
        // 滚动条过度动画
        const beginTime = Date.now()
        const beginValue = el.scrollTop
        const diff = scrollTop - beginValue
        const rAF = window.requestAnimationFrame || (func => setTimeout(func, 16))
        const frameFunc = () => {
          const progress = (Date.now() - beginTime) / 500
          if (progress < 1) {
            el.scrollTop = beginValue + diff * easeInOutCubic(progress)
            rAF(frameFunc)
          } else {
            el.scrollTop = scrollTop
          }
        }
        rAF(frameFunc)
      } else {
        el.scrollTop = scrollTop
      }
    },

    /**
     * 滚动到指定位置
     * */
    scrollToBottom(animation = false) {
      const el = this.$refs.scrollViewRef
      let scrollTop = el.scrollHeight
      console.log(
        this.height,
        this.$refs.scrollViewRef.style.height,
        this.$refs.scrollViewRef.scrollHeight,
        this.$refs.scrollViewRef.offsetHeight,
        this.$refs.scrollViewRef.clientHeight
      )
      let count = 0
      let timer = setInterval(() => {
        count++
        if (count > 2000) {
          clearInterval(timer)
        } else {
          if (el.style.height == `${el.clientHeight}px`) {
            clearInterval(timer)
            if (animation) {
              // 滚动条过度动画
              const beginTime = Date.now()
              const beginValue = el.scrollTop
              const diff = scrollTop - beginValue
              const rAF = window.requestAnimationFrame || (func => setTimeout(func, 16))
              const frameFunc = () => {
                const progress = (Date.now() - beginTime) / 800
                if (progress < 1) {
                  el.scrollTop = beginValue + diff * easeInOutCubic(progress)
                  rAF(frameFunc)
                } else {
                  el.scrollTop = scrollTop
                }
              }
              rAF(frameFunc)
            } else {
              el.scrollTop = scrollTop
            }
          }
        }
      }, 1)
    },

    /**
     * 开始
     * */
    onTouchStart(e) {
      if (!this._enablePull) {
        return
      }
      if (this.move.distance > 50) {
        return
      }
      console.warn(e.changedTouches.length)
      if (e.changedTouches.length > 1) {
        return
      }
      this.move.animationDuration = 0 // 关闭动画
      this.move.distance = 0 // 滑动距离归0
      this.startY = e.targetTouches[0].clientY // 获得开始Y坐标
    },
    /**
     * 手指触摸移动中
     * */
    onTouchMove(e) {
      if (!this._enablePull) {
        return
      }

      if (e.targetTouches.length > 1) {
        return
      }

      let move = e.targetTouches[0].clientY - this.startY
      this.move.direction = move > 0 ? 'down' : 'up'
      let scrollTop = this.$refs.scrollViewRef.scrollTop

      //判断手指滑动的距离，只有为正数才代表用户下拉了。
      if (scrollTop <= 0 && move > 0 && [0, 1].includes(this.move.state)) {
        //阻止默认事件，在微信浏览器中尤为有用，至于为什么，你去试就知道了。
        e.preventDefault()
        e.stopPropagation()
        //增加滑动阻力的感觉
        this.move.distance = Math.pow(move, 0.8)
        if (this.move.distance > this.refreshThreshold) {
          //如果滑动距离大于50 那我就告诉你，释放即可刷新
          if (this.move.state === 1) return
          this.move.state = 1
        } else {
          //否则 恢复原样
          if (this.move.state === 0) return
          this.move.state = 0
        }
      }
    },

    /**
     * 手指离开屏幕
     * */
    onTouchEnd(e) {
      console.log('结束')
      if (!this._enablePull) {
        return
      }
      if (e.targetTouches.length > 1) {
        return
      }
      // e.preventDefault()
      // 只要手指拿开，我都需要加上结束时的动画，这里为300ms
      this.move.animationDuration = 300
      if (this.move.distance > this.refreshThreshold) {
        //这里逻辑跟touchMove一样，但是需要真的加载数据了，那move.state变为2 所以加载动画在这出现
        this.move.state = 2
        //因为还没加载完，我得让加载动画显示着，所以这里移动距离为50
        this.move.distance = this.refreshThreshold

        if (this.move.state != 3) {
          this.$emit(
            'refresh',
            () => {
              //这里就是成功后的回调了，如果该函数被调用，那就以为着加载数据完成，所以状态要回到0，当然需要在父组件调用。
              this.move.state = 3
            },
            () => {
              this.move.state = 4 // 加载失败
            }
          )
        }
      } else {
        //否则 恢复原样
        this.move.distance = 0
      }
    }
  },
  beforeDestroy() {
    this.$refs.scrollViewRef.removeEventListener('scroll', this.throttledScrollHandler)
  }
}
</script>
<style scoped lang="less">
.scroll-view-wrapper {
  position: relative;
  overflow: hidden;
  .scroll-view__header {
    font-size: 14px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #595959;
    background: transparent;
    width: 100%;
    position: relative;
    .pull-header-icon {
      .ic-arrow {
        font-size: 0.54rem !important;
        transition: transform 0.2s;
        display: inline-block;
        margin-right: 0.3rem;
        &.down {
          transition: transform 0.3s;
          transform: rotate(180deg);
        }
        &.up {
          transition: transform 0.3s;
          transform: rotate(0);
        }
      }
      img {
        display: block;
        width: 0.44rem;
        height: 0.44rem;
        margin-right: 0.3rem;
      }
    }

    .pull-header {
      display: flex;
      align-items: center;
      justify-content: center;
      .pull-header-text {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        .text-tip {
          font-size: 0.3rem;
        }
        .text-date {
          font-size: 0.24rem;
          transform: scale(0.9);
          color: #8c8c8c;
        }
      }
    }
  }
  .scroll-view__body {
    position: relative;
    // width: calc(100% + 5px);
    width: 100%;
    overflow-x: hidden;
    overflow-y: auto;
    box-sizing: border-box;
    over-flow: auto; /* winphone8和android4+ */
    -webkit-overflow-scrolling: touch; /* ios5+ */
  }
}
::-webkit-scrollbar {
  width: 0;
  background: transparent;
}
</style>
