/**
 * @Description:
 * @Author bianpengfei
 * @create 2021/5/30 12:33
 */
import { make } from 'vuex-pathify'

const { app } = JSON.parseNoError(localStorage.getItem('extra')) || {}

const state = {
  tabActive: 0 // 下面的 tab 当前激活的
}
const mutations = make.mutations(state)

const actions = {
  ...make.actions(state)
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
