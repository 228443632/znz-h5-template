import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/pages/index'

Vue.use(Router)

const Test = () => import(/* webpackChunkName: "test" */ '@/pages/test.vue');
export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'index',
      meta: {
        keepAlive: false,
      },
      component: Index
    },
    {
      path: '/test',
      name: 'test',
      meta: {
        keepAlive: false,
      },
      component: Test
    }
  ]
})
