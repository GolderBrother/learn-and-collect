// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import axios from 'axios'
import App from './App.vue'
import router from './router'
import './assets/font/iconfont.css'
import './assets/css/base.css'

Vue.config.productionTip = false
axios.defaults.baseURL = 'http://127.0.0.1:3333/'
axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded'
Vue.prototype.$http = axios
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
