import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant from 'vant'
// 引入全部样式
import 'vant/lib/index.less'
// 引入字体图标
import '@/assets/fonts/iconfont.css'
// 实现rem适配
import 'amfe-flexible'

Vue.use(Vant)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
