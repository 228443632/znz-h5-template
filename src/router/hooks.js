/**
 * @Description:
 * @Author bianpengfei
 * @create 2021/4/11 21:32
 */
import { getNodePathItems, listToTree, treeToList } from '@/utils/node-tree'
import commonRoutes from '@/router/modules/common'
export const whiteList = [
  // 白名单
  'authorization'
  // 'health-record-edit-records',
  // 'health-record-report-filing-status',
  // 'health-record-report-move',
  // 'health-record-report-org-config',
  // 'health-record-report-district-config'
]
/**
 * 依赖自动注入 所有路由
 * @param excludes
 * @param enableRef 是否允许开启 引用地址 默认关闭
 * @returns {*|FlatArray<*, 1>[]|any[]}
 */
export const autowiredRoutes = ({ excludes = [] }) => {
  // const path = require('path')
  const modules = require.context('@/router/modules', true, /\.js$/)
  return modules
    .keys()
    .reduce((pre, cur) => {
      const file = cur.replace(/^\.\/(.*)\.\w+$/, '$1')
      if (excludes.includes(file)) {
        return pre
      }
      const routes = setRouteNamePrefix(modules(cur).default, file)
      if (['common'].includes(file)) {
        pre.push(routes)
      } else {
        pre.splice(0, 0, routes)
      }
      return pre
    }, [])
    .flat()
}

/*判断是否有权限访问*/
export const checkPermission = (store, to) => {
  const menusList = store.get('app/menusList')
  const { name } = to
  return menusList.some(v => v.name == name)
}

/**
 * 设置路由名称前缀
 * @param routes
 * @param prefix
 * @returns {*}
 */
const setRouteNamePrefix = (routes, prefix) => {
  if (Array.isArray(routes)) {
    routes.forEach(item => {
      if (item.name && !item.name.startsWith(prefix)) {
        item.name = `${prefix}-${item.name}`
      }
      if (item.children && Array.isArray(item.children)) {
        setRouteNamePrefix(item.children, prefix)
      }
    })
  }
  return routes
}

const hasPermission = (permissionCodes, route) => {
  console.log('filterAsyncRoutes', permissionCodes, route.name)
  if (route.name) {
    return permissionCodes.includes(route.name)
  } else {
    return true
  }
}

const filterAsyncRoutes = (routes, permissionCodes) => {
  const res = []
  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(permissionCodes, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, permissionCodes)
      }
      res.push(tmp)
    }
  })
  return res
}

/*创建菜单*/
export const createMenus = (appPermissions = []) => {
  // let appPermission = [
  //   { permissionCode: 'health-record-record-list' },
  //   { permissionCode: 'health-record-move-in' },
  //   { permissionCode: 'health-record-add-records' },
  //   { permissionCode: 'health-record-edit-records' },
  //   { permissionCode: 'health-record-detail-records' },
  //   { permissionCode: 'health-record-move-out' },
  //   { permissionCode: 'health-record-records-setting' },
  // ]
  console.time('路由权限递归总时间 time：')
  const permissionList = appPermissions.map(v => v.permissionCode).concat(whiteList)
  // 1、获取路由树状图
  const routesTree = autowiredRoutes({ excludes: ['common'] })
  // 2、根据服务端返回的 权限路由Name，精准匹配并找到所有父节点，并返回一个数组中
  const uniqueList = [
    ...new Set(
      permissionList
        .map(v => {
          return getNodePathItems({ list: routesTree, props: { key: 'name', children: 'children' }, value: v })
        })
        .flat()
        .filter(v => v && v.name)
        .map(v => v.name)
    )
  ]

  // const menus = filterAsyncRoutes(routesTree, uniqueList).concat(commonRoutes)
  // const menusList = treeToList({ tree: routesTree }).filter(v => uniqueList.includes(v.name))

  // 3、将路由 树据结构转成链表结构
  const routesList = treeToList({ tree: routesTree })
  // 4、从之前的路由链表结构 和 所有父子节点匹配，返回新的数组
  const menusList = routesList.filter(v => uniqueList.includes(v.name))
  // 5、将返回的新的数组 生成树状结构
  const menus = listToTree({
    list: menusList,
    props: { id: 'ID', parentId: 'PID', children: 'children' },
    root: 0
  }).concat(commonRoutes)

  // console.log(menus, menusList)
  console.timeEnd('路由权限递归总时间 time：')
  return {
    menus,
    menusList
  }
}
