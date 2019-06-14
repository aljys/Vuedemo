// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import iView from 'iview';
import axios from 'axios'
import Cookies from 'js-cookie'
import qs from 'qs'
// import * as filters from './filters'
Vue.locale = () => {};
import i18n from './lang'
Vue.prototype.$axios=axios
Vue.prototype.$qs=qs;
import 'iview/dist/styles/iview.css';
Vue.use(iView)
Vue.use(i18n)
Vue.use(iView, {
  size: Cookies.get('size') || 'medium', // 设置元素ui大小
  i18n: (key, value) => i18n.t(key, value) // 键值对取值
})

// import { prototype } from 'events';
Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  i18n,
  components: { App },
  template: '<App/>'
})
