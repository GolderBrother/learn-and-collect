// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import axios from 'axios'
import VueLazyload from 'vue-lazyload'
import App from './App.vue'
import router from './router'
import './assets/font/iconfont.css'
import './assets/css/base.css'

Vue.config.productionTip = false
axios.defaults.baseURL = 'http://127.0.0.1:3333/'
axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded'
Vue.prototype.$http = axios
Vue.use(VueLazyload, {
  preLoad: 1.3, // 表示lazyload的元素距离页面底部距离的百分比
  error: require('./assets/images/err.png'), // 图片加载失败后的显示的失败图片路径.
  loading: require('./assets/images/loading.gif'), // 图片正在加载中显示的loading图片的路径
  attempt: 1, // 图片加载失败后的重试次数.默认为3.
  listenEvents: ['scroll']// 默认['scroll', 'wheel', 'mousewheel', 'resize', 'animationend', 'transitionend', 'touchmove']//例如如果你给这个属性只指定['touchmove'].那么scroll 屏幕不会加载图片,只有手指滑动屏幕才会加载图片.
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
