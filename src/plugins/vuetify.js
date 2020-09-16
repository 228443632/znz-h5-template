/**
 * @Author bianpengfei
 * @create 2020/9/11 16:55
 */
import Vue from 'vue'
import { Ripple, Scroll } from 'vuetify/lib/directives'

import Vuetify from 'vuetify//lib'

Vue.use(Vuetify, {
  components: {},
  directives: {
    Ripple,
    Scroll
  }
})

export default new Vuetify()
