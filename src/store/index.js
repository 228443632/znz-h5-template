/**
 * @Author bianpengfei
 * @create 2020/9/11 16:55
 */
import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './action'
import getters from './getters'

Vue.use(Vuex)

const state = {}

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})
