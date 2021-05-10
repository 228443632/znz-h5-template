/**
 * @Description:
 * @Author bianpengfei
 * @create 2021/3/23 20:25
 */
import Vue from 'vue'
import store from '@/store'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css' // Progress 进度条样式
import { autowiredRoutes } from '@//router/hooks'
import { whiteList } from './hooks'
let scrollView = document.querySelector('.router-view__wrap')

NProgress.configure({ showSpinner: false })

// 重庆市江津区四面山卫生院 赵启 001
// setToken('token', 'bearer a092d20a-b102-404c-b0e3-f5720a5cb992')

// 重庆市梁平区和林镇卫生院 唐瑶 dy001
// setToken('token', 'bearer 744c29ab-5929-4422-8a37-a704c8706523')

export const routerGuard = router => {
  /*外部登录*/
  const permissionExternal = async (to, from, next, store) => {
    const userInfo = store.get('user/info')
    const { _token, _size } = to.query
    const isFirst = from.path === '/' // 第一次进入系统

    // 外部访问,根据token
    if (_token) {
      store.commit('user/token', _token)
      store.commit('app/headerShow', false)
      store.commit('app/navShow', false)
      store.commit('app/menuShow', false)
      store.commit('app/isExternal', true)
      // 头部携带token
      try {
        if (userInfo.userCode && userInfo) {
          // 用户信息已存在
          next()
        } else {
          isFirst && (await init())
          // 用户信息不存在，重新去请求拉取用户信息
          await store.dispatch('user/getInfo').then(async data => {
            router.addRoutes(autowiredRoutes({}))
            next({ ...to, replace: true })
          })
        }
      } catch (e) {
        console.error(e)
      }
    } else {
      if (from.query._token) {
        // 原路由获取_token, 这样可以一层一层的传下去
        to.query._token = from.query._token
        next({ ...to })
      }
      next()
    }
  }

  /*内部登录*/
  const permissionInternal = async (to, from, next, store) => {
    const token = getCookies('token')
    const userInfo = store.get('user/info')
    store.commit('user/token', token)
    const isFirst = from.path === '/' // 第一次进入系统
    if (token) {
      try {
        if (userInfo.userCode) {
          // 用户信息已存在
          next()
        } else {
          isFirst && (await initEnum())
          // 用户信息不存在，重新去请求拉取用户信息
          await store.dispatch('user/getInfo').then(async data => {
            const routes = await store.dispatch('app/setDynamicRoutes', data.appPermissions)
            router.addRoutes(routes)
            next({ ...to, replace: true })
          })
        }
      } catch (e) {
        console.error(e)
        Message.error('登录失败，请重新登录！')
        await store.dispatch('user/ledLogOut')
        setTimeout(() => {
          window.location.reload()
        }, 200)
      }
    } else {
      // 未登录
      await store.dispatch('user/loginWithThirdParty')
    }
  }

  router.beforeEach(async (to, from, next) => {
    NProgress.start()
    const externalEnter = whiteList.includes(to.name) // 判断是否外部登录
    to.meta.title && (document.title = to.meta.title)
    if (!scrollView) scrollView = document.querySelector('.router-view__wrap')
    if (from.meta.keepAlive) {
      if (!from.meta?.scrollTop) from.meta.scrollTop = {}
      from.meta.scrollTop[from.fullPath] = scrollView?.scrollTop || 0
    }
    if (!to.meta?._t) to.meta._t = {}
    if (!to.meta._t[to.fullPath]) {
      to.meta._t[to.fullPath] = new Date().getTime().toString()
    }

    next()
    return

    // if (externalEnter) {
    //   // 进入白名单，不做任何校验
    //   next()
    // } else {
    //   if (from.query._token || to.query._token) {
    //     // 外部进来
    //     await permissionExternal(to, from, next, store)
    //   } else {
    //     // 内部系统
    //     await permissionInternal(to, from, next, store)
    //   }
    // }
  })

  router.afterEach((to, from, next) => {
    setTimeout(() => {
      // 关闭进度条
      NProgress.done()
    }, 20)
  })
}
