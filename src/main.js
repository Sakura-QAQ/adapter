import Vue from 'vue'
import App from './App.vue'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import router from '@/router'

import vuescroll from 'vuescroll' // 引入vuescroll
import 'vuescroll/dist/vuescroll.css' // 引入vuescroll样式
// 全局less文件
import '@/styles/index.less'

// 导入axios
import axios from '@/api/axios'

// 全局注册的组件index.js
import components from '@/components'

// 全局echarts
import echarts from 'echarts'

// jquery
// import 'jquery'

// 百度地图
import BaiduMap from 'vue-baidu-map'

// axios挂载到大vue原型上
Vue.prototype.$http = axios
// echarts挂载
Vue.prototype.$echarts = echarts

Vue.use(components)

Vue.use(ElementUI)

Vue.use(vuescroll) // 使用

Vue.use(echarts)

Vue.use(BaiduMap, {
  // ak 是在百度地图开发者平台申请的密钥 详见 http://lbsyun.baidu.com/apiconsole/key */
  ak: 'BcFOSdgOOD2ie0nSulgGGRC3hrLrFQcX'
})
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
