<!--
 * @Description:
 * @Author bianpengfei
 * @create 2021/3/23 22:26
 -->
<template>
  <div
    :class="{
      'g-app-view': true,
      main__content: true,
      'div--webkit--scrollbar--none': _isExternal
    }"
  >
    <transition :name="transitionName" appear>
      <keep-alive :include="_cacheRoutes" :max="keepAliveMaxNum">
        <router-view v-if="isReload" :key="$route.fullPath" class="router-view" ref="routerView"> </router-view>
      </keep-alive>
    </transition>
  </div>
</template>

<script>
import { get, call, sync } from 'vuex-pathify'
import { generateNavAttr, rmCacheRoute } from '@/utils/nav'
import { parseQueryString } from '@/utils/common'
export default {
  data() {
    return {
      isReload: true,
      keepAliveMaxNum: 99,
      transitionName: 'fade'
    }
  },

  computed: {
    _isExternal: get('app/isExternal'),
    _navArr: sync('app/navArr'),

    _cacheRoutes() {
      return [...new Set(this._navArr.filter(v => v.meta?.keepAlive).map(v => v.name))]
    }
  },

  watch: {
    $route: {
      handler(to, from) {
        const toTime = to?.meta?._t[to.fullPath]
        const fromTime = from?.meta?._t[from.fullPath]
        console.log('to', toTime, fromTime)
        if (from?.path == '/' || !from?.path) {
          // 第一次进来
          this.transitionName = 'fade'
          this._addNavArrItem(
            generateNavAttr({
              ...to,
              title: to.meta.title
            })
          )
        } else {
          if (Number(toTime) < Number(fromTime)) {
            this.transitionName = 'pop-out'
            this._removeNavItem({
              flag: 'default',
              ...from
            })
          } else {
            this.transitionName = 'pop-in'
            this._addNavArrItem(generateNavAttr({ ...to, title: to.meta.title }))
          }
        }
      },
      immediate: true
    },

    _navArr: {
      handler(a, b) {
        if (a.length < b.length) {
          const removeView = b.find(o => {
            return a.findIndex(i => i.fullPath === o.fullPath) < 0
          })
          if (removeView && removeView.meta?.keepAlive) {
            this.$nextTick(() => {
              this.removeCache(removeView.fullPath)
            })
          }
        }
      }
    }
  },

  created() {
    window.APP_PAGE_ROUTER_VIEW = this
  },

  mounted() {
    setTimeout(() => {
      this.handleResize()
    }, 20)
    this.debounceResizeHandler = this.$debounce(this.handleResize, 300)
    window.addEventListener('resize', this.debounceResizeHandler)
    this.$once('hook:beforeDestroy', () => {
      window.removeEventListener('resize', this.debounceResizeHandler)
    })
  },

  methods: {
    ...call('app', {
      _addNavArrItem: 'addNavArrItem',
      _removeNavItem: 'removeNavItem'
    }),

    handleResize() {
      const scrollView = document.querySelector('.main__content')
      document.querySelector('.main__content').style.height = `calc(100vh - ${
        scrollView.getBoundingClientRect()?.top
      }px)`
    },

    reload(route = this.$route) {
      if (route?.meta?.keepAlive) {
        rmCacheRoute(route?.fullPath, this.$refs.routerView)
      }
      this.isReload = false
      setTimeout(() => {
        this.$nextTick(() => {
          this.isReload = true
        })
      }, 20)
    },

    /*移除缓存的组件*/
    removeCache(fullPath) {
      const cacheRouteInstance = this.$children.find(o => o?.$vnode?.data?.key === fullPath)
      const cache = cacheRouteInstance?.$vnode?.parent.componentInstance?.cache
      const keys = cacheRouteInstance?.$vnode?.parent?.componentInstance?.keys
      if (keys && Array.isArray(keys)) {
        const index = keys.findIndex(v => v.includes(fullPath))
        if (index >= 0) {
          delete cache[keys[index]]
        }
      }
      cacheRouteInstance && cacheRouteInstance.$destroy()
    },

    /*根据url 生成key*/
    generateNavKey(url) {
      const queryString = Object.entries(parseQueryString(url))
        .filter(v => v?.slice(0)?.shift() != '_t')
        .map(v => v?.join('='))
      return `${String(url).split('?').slice(0).shift()}_${queryString}`
    }
  }
}
</script>

<style lang="scss">
.pop-out-enter-active,
.pop-out-leave-active,
.pop-in-enter-active,
.pop-in-leave-active {
  will-change: transform, opcity;
  //transition: 0.38s ease, visibility 0.38s;
  transition: 350ms ease, visibility 0.4s;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  right: 0;
  position: absolute;
  backface-visibility: hidden;
  perspective: 1000;
}

.pop-out-enter {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}

.pop-out-leave-active {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}

.pop-in-enter {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}

.pop-in-leave-active {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}


/* fade */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.28s;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}

</style>
