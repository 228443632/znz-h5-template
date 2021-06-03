/**
 * @Description:
 * @Author bianpengfei
 * @create 2021/3/23 20:25
 */
import Vue from 'vue'
import store from '@/store'
import NProgress from '@/plugins/nprogress'
import { whiteList } from './hooks'

export const routerGuard = router => {
  router.beforeEach(async (to, from, next) => {
    NProgress.start()
    next()
  })

  router.afterEach((to, from, next) => {
    setTimeout(() => {
      // 关闭进度条
      NProgress.done()
    }, 20)
  })
}
