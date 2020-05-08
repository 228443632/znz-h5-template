/**
 * @Author bianpengfei
 * @create 2019/12/27 22:21
 */
import Vue from "vue";
import debounce from "lodash/debounce";
import throttle from "lodash/throttle";

Vue.prototype.$debounce = debounce;
Vue.prototype.$throttle = throttle;
