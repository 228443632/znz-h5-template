/**
 * @Description:
 * @Author bianpengfei
 * @create 2021/4/11 13:51
 */
import Vue from 'vue'
import Router from 'vue-router'
import { routerGuard } from './permission'
import routes from './modules/common'
import { autowiredRoutes } from '@/router/hooks'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  // routes: autowiredRoutes({})
  routes: routes
})
routerGuard(router)

/*vue路由报错捕捉*/
const originalPush = Router.prototype.push
Router.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}

export default router
