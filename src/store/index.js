// Vue
import Vue from 'vue'
import Vuex from 'vuex'
import pathify from './plugins/vuex-pathify'
import { useVuexPersistencePlugin } from './plugins/vuex-persist'
Vue.use(Vuex)

const modules = require.context('@/store/modules', true, /\.js$/)
const store = new Vuex.Store({
  modules: modules
    .keys()
    .reduce((pre, cur) => ({ ...pre, [cur.replace(/^\.\/(.*)\.\w+$/, '$1')]: modules(cur).default }), {}),
  plugins: [
    pathify.plugin,
    useVuexPersistencePlugin({
      key: 'extra',
      excludes: ['user', 'app/menus', 'app/menusList', 'app/cacheRoutes', 'app/navArr', 'app/routingStack']
    })
  ]
})

export default store
