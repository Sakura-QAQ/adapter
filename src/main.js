import Vue from 'vue'
import App from './App.vue'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import router from '@/router'

// 全局less文件
import '@/styles/index.less'

// 导入axios
import axios from '@/api/axios'

// 全局注册的组件index.js
import components from '@/components'

// jquery
// import 'jquery'

// 百度地图
import BaiduMap from 'vue-baidu-map'

// axios挂载到大vue原型上
Vue.prototype.$http = axios

Vue.use(components)

Vue.use(ElementUI)

Vue.use(BaiduMap, {
  // ak 是在百度地图开发者平台申请的密钥 详见 http://lbsyun.baidu.com/apiconsole/key */
  ak: 'BcFOSdgOOD2ie0nSulgGGRC3hrLrFQcX'
})
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
