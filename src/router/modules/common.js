/**
 * @Description:
 * @Author bianpengfei
 * @create 2021/4/11 13:52
 */
export default [{ path: '*', redirect: '/404', name: '/404', meta: { isHidden: true } }]

export const constantsRoutes = [
  {
    path: '/',
    component: () => import('@/layout/default/'),
    redirect: '/index',
    name: '健康档案管理',
    icon: '',
    children: [
      {
        path: '/index',
        name: 'index',
        meta: {
          keepAlive: true
        },
        component: () => import('@/pages/index')
      },
      {
        path: '/index/test',
        name: 'index-test',
        meta: {
          keepAlive: true
        },
        component: () => import(/* webpackChunkName: "test" */ '@/pages/test.vue')
      },
      {
        path: '/index/detail/:id',
        name: 'index-test-detail',
        meta: {
          keepAlive: true
        },
        component: () => import(/* webpackChunkName: "test" */ '@/pages/detail.vue')
      }
    ]
  }
]
