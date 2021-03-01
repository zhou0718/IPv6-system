import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/font/iconfont.js'
import './assets/font/iconfont.css'




import 'echarts-gl'
import 'echarts/map/js/world.js'
Vue.use(ElementUI)

// 动态改变页面标题，根据 router/index.js meta下的title动态改变
/*router.beforeEach((to, from, next) => {
  /!* 路由发生变化修改页面title *!/
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})*/

import BaiduMap from 'vue-baidu-map'
Vue.use(BaiduMap,{
  ak: '9YnzLvjb8L6tb0pa24Xyexbbcb49Huc5'
})
Vue.prototype.bus = new Vue()

import './icons'
Vue.config.productionTip = true
document.title = 'IPv6网络系统'

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
