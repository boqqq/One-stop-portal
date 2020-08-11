// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import  'echarts/theme/macarons.js'
import httpRequest from './utils/httpRequest'
import './utils/common'
import "font-awesome/css/font-awesome.min.css"
import tagCloud from 'v-tag-cloud'
import VueAnimateNumber from 'vue-animate-number'

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(tagCloud)
Vue.use(VueAnimateNumber)
Vue.prototype.$ELEMENT = { size: 'mini' }


// 挂载全局
Vue.prototype.$http = httpRequest // ajax请求方法
/* eslint-disable no-new */
new Vue({
  router,
  ...App,
}).$mount('#app')
