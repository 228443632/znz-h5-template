/**
 * @Author bianpengfei
 * @create 2020/9/11 16:55
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './store/'
import '@/style/'
import '@/plugins/'
import vuetify from '@/plugins/vuetify'

//import './vconsole'

Vue.config.productionTip = false

console.log(process.env.BASE_URL)

const os = require('os')
function getNetworkIp() {
  let needHost = '' // 打开的host
  try {
    // 获得网络接口列表
    let network = os.networkInterfaces()
    console.log(network)
    for (let dev in network) {
      let iface = network[dev]
      for (let i = 0; i < iface.length; i++) {
        let alias = iface[i]
        if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
          needHost = alias.address
        }
      }
    }
  } catch (e) {
    needHost = 'localhost'
  }
  console.log(needHost)
  return needHost
}

console.log(getNetworkIp())
new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
