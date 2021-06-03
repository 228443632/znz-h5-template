<!--
 * @Description:
 * @Author bianpengfei
 * @create 2021/3/23 22:26
 -->
<template>
  <div
    :class="{
      'g-app-view': true,
      main__content: true
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
import { call, sync } from 'vuex-pathify'
import { generateNavAttr, rmCacheRoute } from '@/utils/nav'
import { parseQueryString } from '@/utils/common'

const createBottomTabNavigator = ['tabs_view_home', 'tabs_view_health_value', 'tabs_view_basic_archives']

export default {
  data() {
    return {
      isReload: true,
      keepAliveMaxNum: 99,
      transitionName: 'fade'
    }
  },

  computed: {
    _navArr: sync('app/navArr'),
    _routingStack: sync('app/routingStack'),

    /*缓存哪些路由*/
    _cacheRoutes() {
      return [...new Set(this._navArr.filter(v => v.meta?.cache || v.meta?.permanentCache).map(v => v.name))]
    }
  },

  watch: {
    $route: {
      handler(to, from) {
        let transitionName = 'fade'
        const toIdx = createBottomTabNavigator.indexOf(to?.name)
        const fromIdx = createBottomTabNavigator.indexOf(from?.name)
        if (toIdx != -1 && fromIdx != -1) {
          // 如果是底部tab 页面
          // transitionName = toIdx > fromIdx ? 'pop-in' : 'pop-out'
          transitionName = 'none'
          this._addNavArrItem(generateNavAttr({ ...to, title: to.meta.title }))
        } else {
          // 非底部tab页面
          const isExist = this._routingStack.some(v => v.fullPath == to.fullPath)
          if (isExist) {
            // 已存在
            transitionName = 'pop-out'
            this._removeNavItem({
              flag: 'default',
              ...from
            })
          } else {
            // 不存在
            if (from?.path == '/' || !from?.path) {
              // 第一次进来
              transitionName = 'fade'
            } else {
              transitionName = 'pop-in'
            }
            this._addNavArrItem(generateNavAttr({ ...to, title: to.meta.title }))
          }
        }
        this.transitionName = transitionName
        this._pushRoutingStack(generateNavAttr({ ...to, title: to.meta.title }))
      },
      immediate: true
    },

    _navArr: {
      handler(a, b) {
        if (a.length < b.length) {
          const removeView = b.find(o => {
            return a.findIndex(i => i.fullPath === o.fullPath) < 0
          })
          if (removeView && removeView.meta?.cache) {
            this.$nextTick(() => {
              this.removeCache(removeView.fullPath)
            })
          }
        }
      }
    }
  },

  created() {
    /*
     * 这里暴露出两种方法， 来重新加载页面
     * */
    window.APP_PAGE_ROUTER_VIEW = this
    this.$baseEventBus.$on('reload-router-view', route => {
      this.reload(route)
    })
  },

  mounted() {
    /*
     * 初始化
     * */
    this.init()
  },

  methods: {
    ...call('app', {
      _addNavArrItem: 'addNavArrItem',
      _removeNavItem: 'removeNavItem',
      _pushRoutingStack: 'pushRoutingStack'
    }),

    init() {
      setTimeout(() => {
        this.handleResize()
      }, 20)
      this.addEventListener()
      // this.$once('hook:beforeDestroy', () => {
      //   window.removeEventListener('resize', this.debounceResizeHandler)
      // })
    },

    addEventListener() {
      this.debounceResizeHandler = this.$debounce(this.handleResize, 300)
      window.addEventListener('resize', this.debounceResizeHandler)
    },

    removeEventListener() {
      window.removeEventListener('resize', this.debounceResizeHandler)
    },

    /*处理窗体大小变化*/
    handleResize() {},

    /*重新加载路由*/
    reload(route = this.$route) {
      if (route?.meta?.cache) {
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
  },

  beforeDestroy() {
    this.removeEventListener()
  }
}
</script>

<style lang="less" scoped>
.g-app-view {
  .div--webkit--scrollbar();
  .router-view {
    height: 100%;
    width: 100%;
    box-sizing: border-box;
  }
  .pop-out-enter-active,
  .pop-out-leave-active,
  .pop-in-enter-active,
  .pop-in-leave-active {
    will-change: transform, opcity;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    right: 0;
    position: absolute;
    backface-visibility: hidden;
    perspective: 1000;
  }

  .pop-out-enter-active,
  .pop-out-leave-active {
    transition: transform 200ms ease, opacity 200ms ease, visibility 200ms;
    box-shadow: 0.1rem 0 0.12rem rgba(0, 0, 0, 0.1);
  }

  .pop-in-enter-active,
  .pop-in-leave-active {
    transition: transform 350ms ease, opacity 350ms ease, visibility 350ms;
    box-shadow: -0.1rem 0 0.12rem rgba(0, 0, 0, 0.1);
  }

  /*路由前进，进入*/
  .pop-in-enter {
    opacity: 0;
    transform: translate3d(100%, 0, 0);
  }

  .pop-in-leave-active {
    opacity: 0;
    transform: translate3d(-100%, 0, 0);
  }

  /*路由退出，后退*/
  .pop-out-enter {
    opacity: 0;
    transform: translate3d(-100%, 0, 0);
  }

  .pop-out-leave-active {
    opacity: 0;
    transform: translate3d(100%, 0, 0);
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
}
</style>
