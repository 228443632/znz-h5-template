import { make } from 'vuex-pathify'
import { createMenus } from '@/router/hooks'

const { app } = JSON.parseNoError(localStorage.getItem('extra')) || {}

const state = {
  loading: false, // 菊花loading
  regionNotify: false, // 管辖地区变更确认弹出框
  headerShow: true, // header是否展示
  menuShow: true, // 菜单是否展示
  navShow: true, // 导航栏是否展示
  menuIsCollapse: app?.menuIsCollapse || false, // 菜单是否收缩
  breadcrumb: [], // 面包屑
  navArr: [], // 导航
  menus: [], // 菜单树状
  menusList: [], // 菜单列表
  menuDefaultActive: '',
  menusDefaultOpeneds: app?.menusDefaultOpeneds || [], // 默认打开的菜单
  isExternal: false // 是否是外部 默认是false
}
const mutations = make.mutations(state)

const actions = {
  ...make.actions(state),

  /*添加nav*/
  addNavArrItem({ state, commit }, data) {
    const { navArr } = state
    const idx = navArr.findIndex(v => v.fullPath == data.fullPath)
    if (idx >= 0) {
      // 存在
      navArr.splice(idx, 1, {
        ...data,
        title: navArr[idx]?.title
      })
    } else {
      // 不存在
      navArr.splice(0, 0, {
        ...data,
        title: data?.meta?.title
      })
    }
  },

  /*移除nav*/
  removeNavItem({ state, commit }, data) {
    const { navArr } = state
    const curIdx = navArr.findIndex(v => v.fullPath == data.fullPath)
    if (curIdx != -1) {
      const map = new Map()
        .set('left', () => {
          commit(
            'navArr',
            navArr.filter((v, i) => i >= curIdx)
          )
        })
        .set('right', () => {
          commit(
            'navArr',
            navArr.filter((v, i) => i <= curIdx)
          )
        })
        .set('others', () => {
          commit(
            'navArr',
            navArr.filter((v, i) => i == curIdx)
          )
        })
        .set('default', () => {
          commit(
            'navArr',
            navArr.filter((v, i) => i != curIdx)
          )
        })
      map.get(data.flag)()
      commit('menuDefaultActive', navArr[curIdx - 1]?.fullPath)
    }
  },

  /*添加 当前打开的 sub-menu 的 index 的数组	*/
  addMenusDefaultOpeneds({ state, commit }, data) {
    const { menusDefaultOpeneds } = state
    commit('menusDefaultOpeneds', [...new Set([...menusDefaultOpeneds, data])])
  },

  /*移除 当前打开的 sub-menu 的 index 的数组	*/
  removeMenusDefaultOpeneds({ state, commit }, data) {
    const { menusDefaultOpeneds } = state
    commit(
      'menusDefaultOpeneds',
      menusDefaultOpeneds.filter(v => v != data)
    )
  },

  /*设置动态路由*/
  setDynamicRoutes({ state, commit }, appPermissions) {
    return new Promise((resolve, reject) => {
      const { menus, menusList } = createMenus(appPermissions)
      commit('menus', menus)
      commit('menusList', menusList)
      resolve(menus)
    })
  },

  /** 设置tabs 中某一个item里面数据内容 */
  setTabsNavItem({ state, commit }, data = { name: '', path: '', fullPath: '', meta: {}, params: {}, query: {} }) {
    const { navArr } = state
    if (data.fullPath) {
      const index = navArr.findIndex(item => item.fullPath == data.fullPath)
      if (index >= 0) {
        console.log('setTabsNavItem', data, navArr[index])
        navArr.splice(index, 1, { ...navArr[index], ...data })
        commit('navArr', navArr)
      }
    }
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
