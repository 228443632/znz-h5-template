/**
 * @Description:
 * @Author bianpengfei
 * @create 2021/4/11 13:52
 */

export const bottomTabRoutes = [
  {
    path: '/',
    component: () => import('@/layout/tabs-view'),
    redirect: '/home',
    children: [
      {
        path: '/home',
        name: 'tabs_view_home',
        meta: {
          title: '健康档案首页',
          permanentCache: true // 永久缓存
        },
        component: () => import('@/pages/home')
      },
      {
        path: '/health-value',
        name: 'tabs_view_health_value',
        meta: {
          title: '健康值',
          permanentCache: true // 永久缓存
        },
        component: () => import('@/pages/health-value')
      },

      {
        path: '/basic-archives',
        name: 'tabs_view_basic_archives',
        meta: {
          title: '基础档案',
          permanentCache: true // 永久缓存
        },
        component: () => import('@/pages/basic-archives')
      }
    ]
  }
]

export const constantsRoutes = [
  {
    path: '/',
    component: () => import('@/layout/tabs-view'),
    children: [
      {
        path: '/out-patient/record-list',
        name: 'tabs_view_out_patient_record_list',
        meta: {
          cache: true,
          title: '门诊就诊记录'
        },
        component: () => import('@/pages/out-patient/record-list')
      },
      {
        path: '/out-patient/record-detail/:id(\\d+)',
        name: 'tabs_view_out_patient_record_detail',
        meta: {
          cache: true,
          title: '门诊记录'
        },
        component: () => import('@/pages/out-patient/record-detail')
      },
      {
        path: '/in-patient/record-list',
        name: 'tabs_view_in_patient_record_list',
        meta: {
          cache: true,
          title: '住院就诊记录'
        },
        component: () => import('@/pages/in-patient/record-list')
      },
      {
        path: '/in-patient/record-detail/:id(\\d+)',
        name: 'tabs_view_in_patient_record_detail',
        meta: {
          cache: true,
          title: '住院记录'
        },
        component: () => import('@/pages/in-patient/record-detail')
      }
    ]
  }
]

export default bottomTabRoutes.concat(constantsRoutes)
