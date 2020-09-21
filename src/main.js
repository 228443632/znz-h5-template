import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './store/'
import '@/style/'
import '@/plugins/'
import vuetify from '@/plugins/vuetify'


//import './vconsole'

Vue.config.productionTip = false

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
