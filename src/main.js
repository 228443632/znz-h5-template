/**
 * @Author bianpengfei
 * @create 2020/9/11 16:55
 */
import 'core-js/stable'
import 'regenerator-runtime/runtime'
import '@/config/global'
import Vue from 'vue'
import App from './App.vue'
import router from './router/'
import store from './store/'
import '@/plugins/'
import '@/style/'

import './vconsole'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
